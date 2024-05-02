import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DogCards from '../dogCards/DogCards';
import dogDummyData from './dogDummyData.json';

export default function DogDashboard() {
  const ownerId = parseInt(useParams().ownerId);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const filteredDogs = dogDummyData.filter((dog) => dog.ownerId === ownerId);
    setDogs(filteredDogs);
  }, [ownerId]);

  return (
    <div>
      <h1>Dog Dashboard</h1>
      <Box display="flex" justifyContent="center" alignItems="center">
        <DogCards items={dogs} />
      </Box>
    </div>
  );
}
