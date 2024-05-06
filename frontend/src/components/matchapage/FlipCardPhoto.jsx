import { Box, Typography, ImageList, ImageListItem } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useGetPhotos } from '../../queries/photos';

const FlipCardPhoto = ({ id }) => {
  const { data: photos, isLoading, error } = useGetPhotos(id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error loading photos: {error.message}
      </Typography>
    );
  }

  return (
    <Box mt={2}>
      <Typography variant="h5">Dog Photos</Typography>
      {photos && photos.length > 0 ? (
        <ImageList gap={4} sx={{ width: '100%', height: 'auto' }}>
          {photos.map((photo) => (
            <ImageListItem key={photo.url}>
              <img
                src={`${process.env.REACT_APP_API_URL}/${photo.url}`}
                alt="Dog"
                style={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: '1/1'
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography variant="body1">No photos found for this dog.</Typography>
      )}
    </Box>
  );
};

FlipCardPhoto.propTypes = {
  id: PropTypes.string.isRequired
};

export default FlipCardPhoto;
