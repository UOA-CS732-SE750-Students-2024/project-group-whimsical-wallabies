import { Box, Typography } from '@mui/material';

import React from 'react';
import DogCards from '../DogCards';
import DogCreateUpdateDialog from '../DogCreateUpdateDialog';

export default function DogDashboard() {
  return (
    <Box>
      <Typography variant="h2">My Dog Dashboard</Typography>
      <DogCreateUpdateDialog />
      <Box display="flex" justifyContent="center" alignItems="center" position="relative">
        <DogCards />
      </Box>
    </Box>
  );
}
