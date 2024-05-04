import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageList,
  ImageListItem,
  Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import dogPhotos from './dogPhotos.json';

export default function DogPhotoGallery({ id }) {
  const [allPhotos, setAllPhotos] = useState(dogPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const filteredPhotos = allPhotos.filter((photo) => photo.dog === id);

  const handleDeleteOpen = (photo) => {
    setSelectedPhoto(photo);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setSelectedPhoto(null);
  };

  const handleDelete = () => {
    const updatedPhotos = allPhotos.filter((photo) => photo !== selectedPhoto);
    setAllPhotos(updatedPhotos);
    handleDeleteClose();
  };

  const handleUploadOpen = () => {
    setOpenUploadDialog(true);
  };

  const handleUploadClose = () => {
    setOpenUploadDialog(false);
  };

  const handleUpload = (newPhoto) => {
    // Implement upload logic here
    const updatedPhotos = [...allPhotos, { dog: id, url: newPhoto }];
    setAllPhotos(updatedPhotos);
    handleUploadClose();
  };

  if (filteredPhotos.length === 0) {
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
        Photo Gallery
      </Typography>
      <ImageList sx={{ width: 510, height: 340 }} cols={3} rowHeight={164}>
        {filteredPhotos.map((photo) => (
          <ImageListItem key={photo.url}>
            <img
              srcSet={`${photo.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${photo.url}?w=164&h=164&fit=crop&auto=format`}
              alt={`Dog Photo`}
              loading="lazy"
              style={{
                width: '164px',
                height: '164px',
                objectFit: 'cover'
              }}
            />
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDeleteOpen(photo)}
                sx={{
                  position: 'absolute',
                  top: 1,
                  right: 1,
                  opacity: 0.3,
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ImageListItem>
        ))}
        <ImageListItem>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="164px"
            height="164px"
            border="1px dashed gray"
            borderRadius="4px"
            onClick={handleUploadOpen}
            style={{ cursor: 'pointer' }}
          >
            <AddCircleOutlineIcon fontSize="large" color="action" />
          </Box>
        </ImageListItem>
      </ImageList>
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Delete Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this photo?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUploadDialog} onClose={handleUploadClose}>
        <DialogTitle>Upload Photo</DialogTitle>
        <DialogContent>
          {/* Add photo upload component or logic here */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(URL.createObjectURL(e.target.files[0]))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadClose}>Cancel</Button>
          <Button onClick={handleUploadClose}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DogPhotoGallery.propTypes = {
  id: PropTypes.number.isRequired
};
