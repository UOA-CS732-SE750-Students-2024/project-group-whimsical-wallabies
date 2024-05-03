import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FemaleIcon from '@mui/icons-material/Female';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MaleIcon from '@mui/icons-material/Male';
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Card, CardContent, CardMedia, Chip, Typography, Grid, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import dogDummyData from '../dogDashboard/dogDummyData.json';
import DogPhotoGallery from '../dogPhotoGallery/DogPhotoGallery';

export default function DogProfile() {
  let navigate = useNavigate();

  const { ownerId, id } = useParams();
  const [dog, setDog] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const filteredDogs = dogDummyData.filter(
      (dog) => dog.ownerId === parseInt(ownerId, 10) && dog.id === parseInt(id, 10)
    );
    if (filteredDogs.length > 0) {
      setDog(filteredDogs[0]);
    } else {
      setDog(null);
    }
  }, [ownerId, id]);

  const handleDeleteOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    // Find the index of the dog profile to be deleted
    const dogIndex = dogDummyData.findIndex(
      (dog) => dog.ownerId === parseInt(ownerId, 10) && dog.id === parseInt(id, 10)
    );

    if (dogIndex !== -1) {
      // Remove the dog profile from the dogDummyData array
      dogDummyData.splice(dogIndex, 1);

      // Update the state to reflect the changes
      setDog(null);

      // Close the delete dialog
      handleDeleteClose();

      // Navigate to the dog list page
      navigate(`/${ownerId}/dog`);

      // Display a success message or perform any additional actions
      console.log('Dog profile deleted successfully');
    } else {
      // Handle the case where the dog profile is not found
      console.error('Dog profile not found');
    }
  };

  const handleEdit = () => {
    // Implement edit logic here
    console.log('Edit dog profile');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {dog ? (
        <>
          <Card sx={{ maxWidth: 600 }}>
            <CardMedia component="img" height="300" image={dog.image} alt={dog.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {dog.name}
                {dog.gender === 'Male' ? (
                  <MaleIcon fontSize="small" sx={{ verticalAlign: 'middle', ml: 1 }} />
                ) : (
                  <FemaleIcon fontSize="small" sx={{ verticalAlign: 'middle', ml: 1 }} />
                )}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <PetsIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary" display="inline">
                    {dog.breed}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <EmojiEventsIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary" display="inline">
                    {new Date(dog.dob).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
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
                  {dog.about_me}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  Interested In:
                </Typography>
                {dog.interested_in.map((interest, index) => (
                  <Chip key={index} label={interest} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                ))}
              </Box>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="outlined" color="primary" onClick={handleEdit} sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={handleDeleteOpen}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Box mt={4}>
            <DogPhotoGallery photos={dog.photos} />
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
