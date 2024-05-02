import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import DogCardItem from '../dogCardItem/DogCardItem';

export default function DogCards({ items }) {
  if (items && items.length > 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Grid container spacing={3}>
          {items.map((dog) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={dog.id}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Link to={`/dog/${dog.id}`}>
                <DogCardItem
                  id={dog.id}
                  image={dog.image}
                  name={dog.name}
                  gender={dog.gender}
                  about_me={dog.about_me}
                />
              </Link>
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
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      about_me: PropTypes.string.isRequired
    })
  ).isRequired
};
