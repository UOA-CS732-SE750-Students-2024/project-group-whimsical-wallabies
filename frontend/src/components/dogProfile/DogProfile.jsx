import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FemaleIcon from '@mui/icons-material/Female';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MaleIcon from '@mui/icons-material/Male';
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Card, CardContent, CardMedia, Chip, Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dogDummyData from '../dogDashboard/dogDummyData.json';

export default function DogProfile() {
  const { ownerId, id } = useParams();
  const [dog, setDog] = useState(null);

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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
      {dog ? (
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
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6">No dog found with the provided ownerId and id.</Typography>
      )}
    </Box>
  );
}
