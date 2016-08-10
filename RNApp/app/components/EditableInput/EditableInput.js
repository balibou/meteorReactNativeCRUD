import React, { PropTypes } from 'react';
import { TextInput } from 'react-native';
import Meteor from 'react-native-meteor';
import styles from './styles';

const updateDocument = (id, newTitle) =>
  Meteor.call('documents.update', {
    _id: id,
    update: { title: newTitle },
  }, (error, response) => {
    if (error) console.warn(error.reason);
    if (response) console.log(response);
  });

export default class EditableInput extends React.Component {
  constructor(props) {
    super(props);
    const { document } = props;
    this.state = {
      title: document.title,
    };
  }
  render() {
    let { title } = this.state;
    const { _id } = this.props.document;
    return (
      <TextInput
        style={styles.textInput}
        onSubmitEditing={() => updateDocument(_id, title)}
        onChangeText={(title) => this.setState({ title })}
        value={title}
      />
    );
  }
}

EditableInput.propTypes = {
  document: PropTypes.object,
};
