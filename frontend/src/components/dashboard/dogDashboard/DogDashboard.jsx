import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Tooltip } from '@mui/material';

import React from 'react';
import DogCards from '../dogCards';

export default function DogDashboard() {
  const handleAddDog = () => {
    // Implement logic to navigate to the "Add Dog" page
    console.log('Add Dog clicked');
  };

  return (
    <div>
      <h1>My Dog Dashboard</h1>
      <Box display="flex" justifyContent="center" alignItems="center" position="relative">
        <DogCards />
        <Tooltip title="Add a new dog" arrow>
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
        </Tooltip>
      </Box>
    </div>
  );
}
