import PropTypes from 'prop-types';
import React from 'react';

export const LoadingWrapper = ({ isLoading, children }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired, // Define isLoading as a required boolean
  children: PropTypes.node // Define children as React nodes
};

// import React from 'react';
// import { useQuery } from 'react-query';
// import LoadingWrapper from './LoadingWrapper';
//
// const fetchUserData = async () => {
//   const response = await fetch('https://api.example.com/user');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };
//
// const UserComponent = () => {
//   const { data, isLoading, error } = useQuery('userData', fetchUserData);
//
//   return (
//     <LoadingWrapper isLoading={isLoading}>
//       {error && <div>Error fetching user data</div>}
//       {data && <div>Welcome, {data.name}</div>}
//     </LoadingWrapper>
//   );
// };
