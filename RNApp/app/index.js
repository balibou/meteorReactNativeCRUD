import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';

const SERVER_URL = 'ws://localhost:3000/websocket';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder',
    };
  }

  componentWillMount() {
    Meteor.connect(SERVER_URL);
  }

  renderRow(document) {
    return (
      <Text>{document.title}</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native + Meteor!
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />

        <MeteorListView
          collection="Documents"
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

App.propTypes = {
  documents: React.PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe('documents');
  return {
    documents: Meteor.collection('Documents').find(),
  };
}, App);
