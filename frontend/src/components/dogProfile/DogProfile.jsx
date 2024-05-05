import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FemaleIcon from '@mui/icons-material/Female';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MaleIcon from '@mui/icons-material/Male';
import PetsIcon from '@mui/icons-material/Pets';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetDog, useDeleteDogMutation } from '../../queries/dogs';
import DogPhotoGallery from '../dogPhotoGallery/DogPhotoGallery';
import DogCreateUpdateDialog from '../dogs/DogCreateUpdateDialog';

export default function DogProfile() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data: dog, isLoading, isError } = useGetDog(id); // Use the useGetDogs query
  const { mutate: deleteDog } = useDeleteDogMutation(id); // Use the useDeleteDogMutation mutation

  const handleDeleteOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    deleteDog(dog._id, {
      onSuccess: () => {
        handleDeleteClose();
        navigate(`/dashboard`);
        console.log('Dog profile deleted successfully');
      },
      onError: (error) => {
        console.error('Error deleting dog profile:', error);
      }
    });
  };

  const getAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let ageInYears = today.getFullYear() - birthDate.getFullYear();
    let ageInMonths = today.getMonth() - birthDate.getMonth();
    if (ageInMonths < 0 || (ageInMonths === 0 && today.getDate() < birthDate.getDate())) {
      ageInYears--;
      ageInMonths += 12;
    }
    return `${ageInYears} years ${ageInMonths} months`;
  };

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h6">Error loading dogs.</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {dog ? (
        <>
          <Card sx={{ maxWidth: 600, width: '100%', height: '100%' }}>
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:3001/${dog.profilePicture}`}
              alt={dog.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'bold'
                }}
              >
                {dog.name}
                {dog.gender === 'Male' ? (
                  <MaleIcon
                    fontSize="small"
                    sx={{ verticalAlign: 'middle', ml: 1 }}
                    style={{ color: '#6699ff' }}
                  />
                ) : (
                  <FemaleIcon
                    fontSize="small"
                    sx={{ verticalAlign: 'middle', ml: 1 }}
                    style={{ color: '#ff99cc' }}
                  />
                )}
              </Typography>

              <Box mt={2}>
                <PetsIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                <Typography variant="body2" color="text.secondary" display="inline">
                  {dog.breed}
                </Typography>
              </Box>

              <Box mt={2}>
                <EmojiEventsIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                <Typography variant="body2" color="text.secondary" display="inline">
                  {getAge(dog.dob)}
                </Typography>
              </Box>

              <Box mt={2}>
                <FitnessCenterIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                <Typography variant="body2" color="text.secondary" display="inline">
                  Weight: {dog.weight} kg
                </Typography>
              </Box>

              <Box mt={2}>
                <FavoriteBorderIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                <Typography variant="body2" color="text.secondary" display="inline">
                  Neutered: {dog.neutered ? 'Yes' : 'No'}
                </Typography>
              </Box>

              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  About Me:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dog.bio}
                </Typography>
              </Box>

              <Box mt={2} display="flex" justifyContent="flex-end">
                <DogCreateUpdateDialog dogId={id} />
                <Tooltip title="Delete">
                  <IconButton onClick={handleDeleteOpen}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>

          <Box mt={4}>
            <DogPhotoGallery id={dog._id} />
            {/* <DogPhotoGallery id={1} /> */}
          </Box>
        </>
      ) : (
        <Typography variant="h6">No dog found with the provided ownerId and id.</Typography>
      )}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Delete Dog Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this dog profile?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
