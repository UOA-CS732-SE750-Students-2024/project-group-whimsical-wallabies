import React from 'react';
import { useGetDogs } from './queries/dogs';

const QueryCallExamples = () => {
  const { data, isLoading, error } = useGetDogs();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Dogs</h1>
      {data.map((dog, index) => (
        <div key={index}>
          <h2>{dog.name}</h2>
          <p>{dog.breed}</p>
        </div>
      ))}
    </div>
  );
};

export default QueryCallExamples;
