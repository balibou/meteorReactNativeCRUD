import React, { PropTypes } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Meteor, { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';
import EditableInput from '../../components/EditableInput';

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
  <View>
    <EditableInput document={document} />
    {/* <Text>{document.title}</Text> */}
    <TouchableOpacity style={styles.button} onPress={() => removeDocument(document)}>
       <Text style={styles.buttonText}>
         Remove
       </Text>
     </TouchableOpacity>
  </View>;

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    const { detailsReady } = this.props;
    if (!detailsReady) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={insertNewDocument}
        />
        <MeteorListView
          collection="Documents"
          renderRow={renderRow}
        />
      </View>
    );
  }
}

Details.propTypes = {
  detailsReady: PropTypes.bool,
};
