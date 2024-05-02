import Box from '@mui/material/Box';

import React from 'react';
import { useParams } from 'react-router-dom';

import DogCards from '../dogCards/DogCards';
import dogDummyData from './dogDummyData.json';

export default function DogDashboard() {
  const ownerId = parseInt(useParams().ownerId);
  const dogs = dogDummyData.filter((dog) => dog.ownerId === ownerId);

  return (
    <div>
      <h1>Dog Dashboard</h1>
      <Box display="flex" justifyContent="center" alignItems="center">
        <DogCards items={dogs} />
      </Box>
    </div>
  );
}
