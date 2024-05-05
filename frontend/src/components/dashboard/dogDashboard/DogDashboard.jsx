import { Box, Typography } from '@mui/material';

import React from 'react';
import DogCreateUpdateDialog from '../../dogs/DogCreateUpdateDialog';
import DogCards from '../dogCards';

export default function DogDashboard() {
  return (
    <Box>
      <Typography variant="h2">My Dog Dashboard</Typography>
      <DogCreateUpdateDialog />
      <DogCards />
    </Box>
  );
}
