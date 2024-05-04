import React from 'react';
import { useParams } from 'react-router-dom';
import DogFormBase from '../DogFormBase';

function UpdateDogForm() {
  const { dogId } = useParams();
  return <DogFormBase dogId={dogId} />;
}

export default UpdateDogForm;
