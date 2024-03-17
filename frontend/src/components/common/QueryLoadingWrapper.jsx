import PropTypes from 'prop-types';
import React from 'react';
import { useIsFetching } from 'react-query';

export const QueryLoadingWrapper = ({ children }) => {
  const isFetching = useIsFetching();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

QueryLoadingWrapper.propTypes = {
  children: PropTypes.node // Define children as React nodes
};

// // Usage
// const MyComponentWithLoading = () => (
//   <QueryLoadingWrapper>
//     <MyComponent />
//   </QueryLoadingWrapper>
// );
