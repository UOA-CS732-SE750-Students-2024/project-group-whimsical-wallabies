import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { commonStyles } from '../common/commonStyles';
import petImage from './dog_cat.png';

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
    <Container sx={commonStyles.homeContainerStyles} maxWidth="xl">
      <Box sx={commonStyles.homeBoxStyles}>
        <Typography variant="h1" sx={commonStyles.homeTypographyStyles}>
          Paw Mate
        </Typography>
        <Typography variant="subtitle1" sx={commonStyles.homeSubtitleStyles}>
          Find your pet&apos;s <strong>perfect playdate</strong>.<br />
          Discover personalized playdates for your pet&apos;s size, energy, and personality.
        </Typography>

        <div>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={commonStyles.homeButtonStyles}>
              Log in
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={commonStyles.homeButtonStyles}>
              Sign Up
            </Button>
          </Link>
        </div>
      </Box>
      <div
        style={{
          height: '130px',
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          zIndex: 1
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-30%)',
          zIndex: 1
        }}
      >
        <img src={petImage} alt="Your Image" style={{ maxWidth: '120%', maxHeight: '1000px' }} />
      </div>
    </Container>
  );
};

export default HomePage;
