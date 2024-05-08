import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FemaleIcon from '@mui/icons-material/Female';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MaleIcon from '@mui/icons-material/Male';
import PetsIcon from '@mui/icons-material/Pets';
import { Typography, Card, CardContent, CardMedia, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApiInstance from '../../utils/axiosApiInstance';
import FlipCardPhoto from '../matchapage/FlipCardPhoto';

const FriendDogProfile = () => {
  const { userId, dogId } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  const getNeuteredStatus = (neutered) => {
    return neutered ? 'Yes' : 'No';
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const monthsDiff =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth());
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    if (years === 0) {
      return `${months} months`;
    } else {
      return `${years} years ${months} months`;
    }
  };

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const response = await axiosApiInstance.get(`/api/dog/${userId}/${dogId}`);
        setDog(response.data);
      } catch (error) {
        console.error('Error fetching dog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogData();
  }, [userId, dogId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!dog) {
    return <Typography variant="body1">Dog data not found.</Typography>;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            maxWidth: 630,
            width: '100%',
            backgroundColor: '#fafcfd',
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CardMedia
            component="img"
            height="500"
            image={`${process.env.REACT_APP_API_URL}/${dog.profilePicture}`}
            alt={dog.name}
          />
          <CardContent>
            <Typography variant="h2" gutterBottom>
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
            <Typography variant="body1" gutterBottom>
              <PetsIcon />
              {dog.breed}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <EmojiEventsIcon />
              Age: {calculateAge(dog.dob)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <FitnessCenterIcon />
              Weight: {dog.weight} kg
            </Typography>
            <Typography variant="body1" gutterBottom>
              <FavoriteBorderIcon />
              Neutered: {getNeuteredStatus(dog.neutered)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              About Me: {dog.bio}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={5}>
        <FlipCardPhoto id={dogId} sx={{ height: '100px' }} />
      </Grid>
    </Grid>
  );
};

export default FriendDogProfile;
