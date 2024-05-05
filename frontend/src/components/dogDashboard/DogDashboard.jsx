import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetDogs } from '../../queries/dogs';
import DogCards from '../dogcards/DogCards';
// mock data
// import dogDummyData from './dogDummyData.json';

export default function DogDashboard() {
  //mock data
  // const ownerId = parseInt(useParams().ownerId);
  // const [dogs, setDogs] = useState([]);

  // useEffect(() => {
  //   const filteredDogs = dogDummyData.filter((dog) => dog.ownerId === ownerId);
  //   setDogs(filteredDogs);
  // }, [ownerId]);

  const navigate = useNavigate();
  const { data: dogs, isLoading, isError } = useGetDogs();

  const handleAddDog = () => {
    navigate('/DogCreate');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading dogs.</div>;
  }

  return (
    <div>
      <h1>My Dog Dashboard</h1>
      <Box display="flex" justifyContent="center" alignItems="center" position="relative">
        <DogCards items={dogs || []} />
        <Tooltip title="Add a new dog" arrow>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              backgroundColor: '#ffc2cd',
              '&:hover': { backgroundColor: '#ff93ac' }
            }}
            onClick={handleAddDog}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </div>
  );
}
