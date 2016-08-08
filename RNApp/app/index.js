// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';
//
// const SERVER_URL = 'ws://localhost:3000/websocket';
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: 'Type a document title and press enter',
//     };
//   }
//
//   componentWillMount() {
//     Meteor.connect(SERVER_URL);
//   }
//
//   renderRow(document) {
//     function removeDocument() {
//       Meteor.call('documents.remove', {
//         _id: document._id,
//       }, (error, response) => {
//         if (error) console.warn(error.reason);
//         if (response) console.log(response);
//       });
//     }
//     // function updateDocument() {
//     //   console.log(document);
//     //   Meteor.call('documents.update', {
//     //     _id: document._id,
//     //     update: { title: document.title },
//     //   }, (error, response) => {
//     //     if (error) console.warn(error.reason);
//     //     if (response) console.log(response);
//     //   });
//     // }
//     return (
//       <View>
//         <Text>{document.title}</Text>
//         {/* <TextInput
//           style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//           // onSubmitEditing={updateDocument}
//           value={document.title}
//         /> */}
//         <TouchableOpacity style={styles.button} onPress={removeDocument}>
//           <Text style={styles.buttonText}>
//             Remove
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
//
//   insertNewDocument(item) {
//     Meteor.call('documents.insert', {
//       title: item.nativeEvent.text,
//     }, (error, response) => {
//       if (error) console.warn(error.reason);
//       if (response) console.log(response);
//     });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native + Meteor!
//         </Text>
//         <TextInput
//           style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//           onChangeText={(text) => this.setState({ text })}
//           value={this.state.text}
//           onSubmitEditing={this.insertNewDocument}
//         />
//
//         <MeteorListView
//           collection="Documents"
//           renderRow={this.renderRow}
//         />
//       </View>
//     );
//   }
// }
//
// App.propTypes = {
//   documents: React.PropTypes.array,
// };
//
// export default createContainer(() => {
//   Meteor.subscribe('documents');
//   return {
//     documents: Meteor.collection('Documents').find(),
//   };
// }, App);

import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import LoggedOut from './layouts/LoggedOut';
import LoggedIn from './layouts/LoggedIn';
import Loading from './components/Loading';
import settings from './config/settings';

Meteor.connect(settings.METEOR_URL);

const RNApp = (props) => {
  const { status, user, loggingIn } = props;

  if (status.connected === false || loggingIn) {
    return <Loading />;
  } else if (user !== null) {
    return <LoggedIn />;
  } else {
    return <LoggedOut />;
  }
};

RNApp.propTypes = {
  status: React.PropTypes.object,
  user: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
};

export default createContainer(() => {
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, RNApp);
