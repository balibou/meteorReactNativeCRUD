import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Documents from './Documents';

const DocumentsContainer = ({ documentsReady }) => {
  return (
    <Documents
      documentsReady={documentsReady}
    />
  );
};

DocumentsContainer.propTypes = {
  documentsReady: PropTypes.bool,
};

export default createContainer(() => {
  const handle = Meteor.subscribe('documents');
  return {
    documentsReady: handle.ready(),
  };
}, DocumentsContainer);
