import { Box, Grid, Typography } from '@mui/material';

import React from 'react';
import { useGetDogs } from '../../../queries/dogs';
import DogCardItem from '../dogCardItem';

const DogCards = () => {
  const { data: dogs } = useGetDogs();
  if (!dogs) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h1">No dogs found</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container>
        {dogs.map(({ _id, name, gender, profilePicture, bio }) => (
          <Grid
            item
            key={_id}
            xs={12}
            sm={4}
            lg={2}
            p={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <DogCardItem
              id={_id}
              image={profilePicture}
              name={name}
              gender={gender}
              aboutMe={bio}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DogCards;
