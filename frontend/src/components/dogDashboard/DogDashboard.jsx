import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

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

  const handleAddDog = () => {
    // Implement logic to navigate to the "Add Dog" page
    console.log('Add Dog clicked');
  };

  return (
    <div>
      <h1>My Dog Dashboard</h1>
      <Box display="flex" justifyContent="center" alignItems="center" position="relative">
        <DogCards items={dogs} />
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: '#ffc2cd',
            '&:hover': {
              backgroundColor: '#ff93ac'
            }
          }}
          onClick={handleAddDog}
        >
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
}
