import React, { PropTypes } from 'react';
import { View, TextInput } from 'react-native';
import Meteor, { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';
import EditableInput from '../../components/EditableInput';
import Button from '../../components/Button';

const insertNewDocument = (item) =>
  Meteor.call('documents.insert', {
    title: item.nativeEvent.text,
  }, (error, response) => {
    if (error) console.warn(error.reason);
    if (response) console.log(response);
  });

const removeDocument = (document) =>
    Meteor.call('documents.remove', {
      _id: document._id,
    }, (error, response) => {
      if (error) console.warn(error.reason);
      if (response) console.log(response);
    });

const renderRow = (document) =>
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <EditableInput key={document._id} document={document}/>
     <Button
       text="Remove"
       onPress={() => removeDocument(document)}
       color='danger'
     />
  </View>;

export default class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    const { documentsReady } = this.props;
    if (!documentsReady) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 5, paddingVertical: 10,
          paddingHorizontal: 20 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={insertNewDocument}
          placeholder="Type a document title and press enter..."
        />
        <MeteorListView
          collection="Documents"
          renderRow={renderRow}
        />
      </View>
    );
  }
}

Documents.propTypes = {
  documentsReady: PropTypes.bool,
};
