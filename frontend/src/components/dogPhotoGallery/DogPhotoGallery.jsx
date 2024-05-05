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
  Tooltip,
  Input
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import dogPhotos from './dogPhotos.json';

function UploadDialog({
  open,
  onClose,
  onFileChange,
  onUpload,
  previewUrl,
  uploadError,
  fileName
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Photo</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Input type="file" accept="image/*" onChange={onFileChange} />
          {fileName && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected file: {fileName}
            </Typography>
          )}
          {previewUrl && (
            <Box mt={2}>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%' }} />
            </Box>
          )}
          {uploadError && (
            <Box mt={2}>
              <Typography color="error">{uploadError}</Typography>
            </Box>
          )}
          <Box mt={2}>
            <Button variant="contained" onClick={onUpload} disabled={!previewUrl}>
              Upload
            </Button>
            <Button onClick={onClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function DeleteDialog({ open, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Photo</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this photo?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function DogPhotoGallery({ id }) {
  const [allPhotos, setAllPhotos] = useState(dogPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

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
    setFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    try {
      // Implement the upload logic here
      const uploadedUrl = `https://example.com/uploaded-image-${Date.now()}.jpg`; // Simulated URL
      const updatedPhotos = [...allPhotos, { dog: id, url: uploadedUrl }];
      setAllPhotos(updatedPhotos);
      handleUploadClose();
    } catch (error) {
      setUploadError('Failed to upload the image. Please try again.');
      console.error('Upload error:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Photo Gallery
      </Typography>
      <ImageList sx={{ width: 510, height: 340 }} cols={3} rowHeight={164}>
        {filteredPhotos.map((photo) => (
          <ImageListItem key={photo.url}>
            <img
              src={`${photo.url}?w=164&h=164&fit=crop&auto=format`}
              alt="Dog"
              loading="lazy"
              style={{ width: '164px', height: '164px', objectFit: 'cover' }}
            />
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDeleteOpen(photo)}
                sx={{
                  position: 'absolute',
                  top: 1,
                  right: 1,
                  opacity: 0.3,
                  '&:hover': { opacity: 1 }
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
      <DeleteDialog open={openDeleteDialog} onClose={handleDeleteClose} onDelete={handleDelete} />
      <UploadDialog
        open={openUploadDialog}
        onClose={handleUploadClose}
        onFileChange={handleFileChange}
        onUpload={handleUpload}
        previewUrl={previewUrl}
        uploadError={uploadError}
        fileName={file ? file.name : ''}
      />
    </Box>
  );
}

DogPhotoGallery.propTypes = {
  id: PropTypes.number.isRequired
};

UploadDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  previewUrl: PropTypes.string,
  uploadError: PropTypes.string,
  fileName: PropTypes.string
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
