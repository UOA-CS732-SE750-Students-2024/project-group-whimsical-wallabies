import CloseIcon from '@mui/icons-material/Close';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useGetPhotos } from '../../queries/photos';

const TransparentDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const FlipCardPhoto = ({ id }) => {
  const { data: photos, isLoading, error } = useGetPhotos(id);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleOpenPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };

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
      <Typography variant="h6">
        <PhotoLibraryIcon />
        <span> </span>
        Dog Photos
      </Typography>
      {photos && photos.length > 0 ? (
        <ImageList gap={4} sx={{ width: '100%', height: 'auto' }}>
          {photos.map((photo) => (
            <ImageListItem key={photo.url} onClick={() => handleOpenPhoto(photo)}>
              <img
                src={`${process.env.REACT_APP_API_URL}/${photo.url}`}
                alt="Dog"
                style={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: '1/1',
                  cursor: 'pointer' // Make cursor change to pointer on hover
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography variant="body1">No photos found for this dog.</Typography>
      )}

      {/* Dialog to display selected photo */}
      <TransparentDialog
        open={selectedPhoto !== null}
        onClose={handleClosePhoto}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <IconButton
            aria-label="close"
            onClick={handleClosePhoto}
            sx={{ position: 'absolute', top: 5, right: 5, color: 'inherit' }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={`${process.env.REACT_APP_API_URL}/${selectedPhoto?.url}`}
            alt="Dog"
            style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
        </DialogContent>
      </TransparentDialog>
    </Box>
  );
};

FlipCardPhoto.propTypes = {
  id: PropTypes.string.isRequired
};

export default FlipCardPhoto;
