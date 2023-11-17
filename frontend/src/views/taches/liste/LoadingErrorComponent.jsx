import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Alert } from '@mui/material';

const LoadingErrorComponent = ({ loading, error }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
        <div>Chargement en cours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" style={{ marginTop: '20px' }}>
        Une erreur est produite : {error.message}
      </Alert>
    );
  }

  return null;
};

LoadingErrorComponent.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.any
  }),
  loading: PropTypes.any
};

export default LoadingErrorComponent;
