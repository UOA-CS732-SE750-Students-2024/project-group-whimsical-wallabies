import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useGetDogs } from '../../../queries/dogs';
import DogCardItem from '../dogCardItem';
import NoDogsFound from './NoDogFound';

const DogCards = () => {
  const { data: dogs, error, isLoading } = useGetDogs();

  if (isLoading) return <Typography>Loading...</Typography>; // Loading state
  if (error) return <Typography>Error loading dogs.</Typography>; // Error state

  if (!dogs || dogs.length === 0) {
    return <NoDogsFound />;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container spacing={1}>
        {dogs.map(({ _id, name, gender, profilePicture, bio }) => (
          <Grid item key={_id} xs style={{ display: 'flex', justifyContent: 'center' }}>
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
