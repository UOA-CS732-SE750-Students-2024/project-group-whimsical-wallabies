import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { Box, Typography, CircularProgress, Paper, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetPlacesToWalkMyDog } from '../../../queries/thridParties';

const DogWalkingPlaces = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const { data: placesData } = useGetPlacesToWalkMyDog(
    {
      lat: location.latitude,
      lon: location.longitude
    },
    {
      enabled: (location.latitude && location.longitude) !== null
    }
  );
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error occurred while getting location: ', error);
      }
    );
  }, []);
  if (!placesData) return <CircularProgress />;
  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" align="center">
        Near Dog Walking Places
      </Typography>
      <Typography variant="caption" align="center">
        Powered by ChatGPT
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {placesData.answer.map(
          ({ name, distancesByWalk, timeByWalk, distancesByCar, timeByCar }) => (
            <Box key={name} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6">{name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DirectionsWalkIcon color="primary" />
                <Typography variant="body2">{`Walk: ${distancesByWalk} km, ${timeByWalk} mins`}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DirectionsCarIcon color="secondary" />
                <Typography variant="body2">{`Car: ${distancesByCar} km, ${timeByCar} mins`}</Typography>
              </Box>
            </Box>
          )
        )}
        <Divider />
      </Box>
    </Paper>
  );
};

export default DogWalkingPlaces;
