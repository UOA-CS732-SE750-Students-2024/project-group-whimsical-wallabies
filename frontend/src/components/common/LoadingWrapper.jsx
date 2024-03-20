import PropTypes from 'prop-types';
import React from 'react';

export const LoadingWrapper = ({ isLoading, children, customMessage = undefined }) => {
  if (isLoading) {
    return <div>{customMessage || 'Loading...'}</div>;
  }

  return <>{children}</>;
};

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  customMessage: PropTypes.string
};
