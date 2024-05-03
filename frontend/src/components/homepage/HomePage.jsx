import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import petImage from '../../images/homeDogImage.png';
import { CommonStyles } from '../common/CommonStyles';

const HomePage = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.getElementById('root').style.margin = '0';
    document.getElementById('root').style.padding = '0';
  }, []);

  return (
    <Container sx={CommonStyles.homeContainerStyles} maxWidth="xl">
      <Box sx={CommonStyles.homeBoxStyles}>
        <Typography variant="h1" sx={CommonStyles.homeTypographyStyles}>
          Paw Mate
        </Typography>
        <Typography variant="subtitle1" sx={CommonStyles.homeSubtitleStyles}>
          Find your pet&apos;s <strong>perfect playdate</strong>.<br />
          Discover personalized playdates for your pet&apos;s size, energy, and personality.
        </Typography>

        <Box>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={CommonStyles.homeButtonStyles}>
              Log in
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={CommonStyles.homeButtonStyles}>
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        style={{
          height: '130px',
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          zIndex: 1
        }}
      ></Box>
      <Box
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-30%)',
          zIndex: 1
        }}
      >
        <img src={petImage} alt="Your Image" style={{ maxWidth: '120%', maxHeight: '1000px' }} />
      </Box>
    </Container>
  );
};

export default HomePage;
