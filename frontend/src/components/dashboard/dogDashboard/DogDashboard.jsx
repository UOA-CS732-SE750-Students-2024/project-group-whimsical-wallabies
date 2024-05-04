import { Box } from '@mui/material';

import React from 'react';
import DogCreateUpdateDialog from '../../dogs/DogCreateUpdateDialog';
import DogCards from '../dogCards';

export default function DogDashboard() {
  return (
    <div>
      <h1>My Dog Dashboard</h1>
      <DogCreateUpdateDialog />
      <Box display="flex" justifyContent="center" alignItems="center" position="relative">
        <DogCards />
      </Box>
    </div>
  );
}
