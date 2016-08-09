import React, { PropTypes } from 'react';
import { Text, View, TextInput } from 'react-native';
import Meteor, { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';

// // const insertNewDocument = (item) =>
// //   Meteor.call('documents.insert', {
// //     title: item.nativeEvent.text,
// //   }, (error, response) => {
// //     if (error) console.warn(error.reason);
// //     if (response) console.log(response);
// //   });
//
// const Details = ({ detailsReady, title }) => {
//   if (!detailsReady) {
//     return <Loading />;
//   }
//
//   console.log(this);
//
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//         onChangeText={(text) => this.setState({ text })}
//         // value={this.state.text}
//         // onSubmitEditing={insertNewDocument}
//       />
//       <MeteorListView
//         collection="Documents"
//         renderRow={(document) => <Text>{document.title}</Text>}
//       />
//     </View>
//   );
// };
//
// Details.propTypes = {
//   detailsReady: PropTypes.bool,
// };
//
// export default Details;

const insertNewDocument = (item) =>
  Meteor.call('documents.insert', {
    title: item.nativeEvent.text,
  }, (error, response) => {
    if (error) console.warn(error.reason);
    if (response) console.log(response);
  });

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
          renderRow={(document) => <Text>{document.title}</Text>}
        />
      </View>
    );
  }
}

Details.propTypes = {
  detailsReady: PropTypes.bool,
};
