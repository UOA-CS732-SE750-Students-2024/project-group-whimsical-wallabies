import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';
import React from 'react';
import DogCardItem from '../dogcarditem/DogCardItem';

export default function DogCards({ items }) {
  if (items && items.length > 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Grid container spacing={5}>
          {items.map((dog) => (
            <Grid item key={dog.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <DogCardItem
                ownerId={dog.ownerId}
                id={dog.id}
                image={dog.image}
                name={dog.name}
                gender={dog.gender}
                about_me={dog.about_me}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else {
    return (
      <div>
        <h1>No Dogs Found</h1>
      </div>
    );
  }
}

DogCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      ownerId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      about_me: PropTypes.string.isRequired
    })
  ).isRequired
};
