import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud'; // Import icons relevant to the weather
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WaterIcon from '@mui/icons-material/Water';
import { Box, Typography, Paper, Grid, Divider, CircularProgress } from '@mui/material';

import React, { useEffect, useState } from 'react';

import { useGetWeather } from '../../../queries/thridParties';

const Weather = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const { data: weatherData } = useGetWeather(
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

  if (!weatherData) return <CircularProgress />;

  const { main, weather, wind, isGoodDayForWalk } = weatherData;

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" align="center">
        Weather in Auckland
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <ThermostatIcon color="primary" sx={{ mr: 1 }} />
            <Typography>Temp: {main.temp}°C</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <WaterIcon color="primary" sx={{ mr: 1 }} />
            <Typography>Humidity: {main.humidity}%</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <AirIcon color="primary" sx={{ mr: 1 }} />
            <Typography>Wind: {wind.speed} m/s</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CloudIcon color="primary" sx={{ mr: 1 }} />
            <Typography>{weather[0].description}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h4" align="center" color={isGoodDayForWalk ? 'green' : 'red'}>
        {isGoodDayForWalk ? (
          <Box color="green" display="flex" alignItems="center" justifyContent="center">
            <ThumbUpIcon sx={{ mr: 1 }} />
            Good day for walking your dog!
          </Box>
        ) : (
          <Box color="red" display="flex" alignItems="center" justifyContent="center">
            <ThumbDownIcon sx={{ mr: 1 }} />
            Not a good day for walking your dog.
          </Box>
        )}
      </Typography>
    </Paper>
  );
};

export default Weather;
