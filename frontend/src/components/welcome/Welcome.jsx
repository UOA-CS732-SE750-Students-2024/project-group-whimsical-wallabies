import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import Weather from '../utils/Weather';

const Welcome = () => {
  return (
    <Box
      style={{
        minHeight: '80vh', // Ensures full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px', // Add padding for content
        textAlign: 'center'
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Weather />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box style={{ maxWidth: '600px', textAlign: 'center' }}>
            <Typography
              variant="h1"
              style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}
            >
              Welcome to Paw Mate!
            </Typography>
            <p style={{ fontSize: '18px', lineHeight: '1.5', color: '#333' }}>
              Paw Mate is your go-to platform for finding the perfect playdate for your pet. Whether
              you have a dog, cat, or any furry friend, Paw Mate helps you discover personalized
              playdates based on your pet&apos;s size, energy level, and personality.
            </p>
            <Typography
              variant="h2"
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333',
                marginTop: '40px',
                marginBottom: '20px'
              }}
            >
              Key Features:
            </Typography>
            <ul
              style={{
                fontSize: '18px',
                lineHeight: '1.5',
                color: '#333',
                textAlign: 'left',
                paddingLeft: '20px'
              }}
            >
              <li>
                <strong>MY DOGS:</strong> Access all your dogs&apos; information, where you can add,
                edit, review, or delete their details.
              </li>
              <li>
                <strong>FRIENDS:</strong> View your friend list, see who has matched with you, and
                explore potential playdates for your pets.
              </li>
              <li>
                <strong>MATCHING:</strong> Engage in matching with other users&apos; dogs to find
                compatible playmates for your furry companions.
              </li>
            </ul>
            <p style={{ fontSize: '18px', lineHeight: '1.5', color: '#333', marginTop: '40px' }}>
              Start connecting with fellow pet owners and make your pet&apos;s social life more fun
              and exciting with Paw Mate!
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
