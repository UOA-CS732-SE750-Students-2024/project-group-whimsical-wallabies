import { Box, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PropTypes from 'prop-types';

import React from 'react';

export default function DogPhotoGallery({ photos }) {
  console.log(photos);
  if (photos.length === 0) {
    return (
      <Box mt={2}>
        <Typography variant="body1" gutterBottom>
          No more photos to show
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {' '}
        Photo Gallery{' '}
      </Typography>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {photos.map((photo, index) => (
          <ImageListItem key={index}>
            <img
              srcSet={`${photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${photo}?w=164&h=164&fit=crop&auto=format`}
              alt={`Dog Photo ${index + 1}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

DogPhotoGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired
};
