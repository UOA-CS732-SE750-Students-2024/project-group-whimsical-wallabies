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
  Input,
  useMediaQuery,
  useTheme,
  Modal
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  useGetPhotos,
  useCreatePhotoMutation,
  useDeletePhotoMutation
} from '../../../queries/photos';

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
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const { data: photos, isLoading, refetch } = useGetPhotos(id);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint for mobile devices
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs')); // Extra small screen breakpoint
  const isLargeMobile = useMediaQuery(theme.breakpoints.down('md')); // Breakpoint for large mobile devices

  const handleOpenImageModal = (photoUrl) => {
    setSelectedImage(photoUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage(null);
  };

  const getCols = () => {
    if (isSmallMobile) {
      return 1; // Single column for extra small screens
    } else if (isMobile) {
      return 1; // One columns for small screens
    } else if (isLargeMobile) {
      return 3; // Three columns for medium screens
    } else {
      return (photos.length <= 5 && photos.length) || 5; // Three columns for larger screens
    }
  };

  const getImageSize = () => {
    if (isMobile) {
      return 342; // 50% of the viewport width for mobile devices
    } else {
      return 200; // Fixed width of 200px for larger screens
    }
  };

  const { mutate: createPhoto } = useCreatePhotoMutation(id, {
    onSuccess: refetch
  });
  const { mutate: deletePhoto } = useDeletePhotoMutation(id, selectedPhoto?._id, {
    onSuccess: refetch
  });

  const handleDeleteOpen = (photo) => {
    setSelectedPhoto(photo);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setSelectedPhoto(null);
    refetch();
  };

  const handleDelete = () => {
    if (selectedPhoto) {
      deletePhoto(
        { dogId: id, photoId: selectedPhoto._id },
        {
          onSuccess: () => {
            handleDeleteClose();
          }
        }
      );
    } else {
      console.error('No photo selected for deletion');
    }
  };

  const handleUploadOpen = () => {
    setOpenUploadDialog(true);
  };

  const handleUploadClose = () => {
    setOpenUploadDialog(false);
    setFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    refetch();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      createPhoto(formData, {
        onSuccess: () => {
          handleUploadClose();
        }
      });
    } catch (error) {
      setUploadError('Failed to upload the image. Please try again.');
      console.error('Upload error:', error);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom mt={2}>
        Photo Gallery
      </Typography>
      <ImageList
        sx={{
          width: '100%',
          height: 'auto'
        }}
        gap={4}
        cols={getCols()}
        rowHeight={getImageSize()} // Use getImageSize to set the rowHeight
      >
        {photos.map((photo) => (
          <ImageListItem key={photo.url}>
            <img
              src={`${process.env.REACT_APP_API_URL}/${photo.url}?w=${getImageSize()}&h=${getImageSize()}&fit=crop&auto=format`}
              name="add-photo"
              alt="Dog"
              loading="lazy"
              style={{
                width: '100%', // Span the full width of the column
                height: '100%', // Maintain a square aspect ratio
                objectFit: 'cover',
                aspectRatio: '1/1',
                cursor: 'pointer'
              }}
              onClick={() => handleOpenImageModal(`${process.env.REACT_APP_API_URL}/${photo.url}`)} // Add click handler
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
                <DeleteIcon fontSize={isMobile ? 'small' : 'inherit'} />
              </IconButton>
            </Tooltip>
          </ImageListItem>
        ))}
        <ImageListItem>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={getImageSize()}
            height={getImageSize()}
            border="1px dashed gray"
            borderRadius="4px"
            onClick={handleUploadOpen}
            style={{ cursor: 'pointer' }}
          >
            <AddCircleOutlineIcon fontSize={isMobile ? 'large' : 'large'} color="action" />
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
      <Modal
        open={openImageModal}
        onClose={handleCloseImageModal}
        onClick={handleCloseImageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ cursor: 'pointer' }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '1000px',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}

DogPhotoGallery.propTypes = {
  id: PropTypes.string.isRequired
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
