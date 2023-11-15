import React from 'react';

const LoadingErrorComponent = ({ loading, error }) => {
  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur est produite : {error.message}</div>;
  }

  return null;
};

export default LoadingErrorComponent;