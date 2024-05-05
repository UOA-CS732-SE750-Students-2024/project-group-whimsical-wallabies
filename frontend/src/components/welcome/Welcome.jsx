import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import SearchIcon from '@mui/icons-material/Search';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import React from 'react';
import backgroundImage from '../../images/homeDogImage.png';

import DogWalkingPlaces from '../utils/DogWalkingPlaces';
import Weather from '../utils/Weather';

const Welcome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '650px 500px',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          minHeight: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 10px',
          textAlign: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.6)'
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={3}>
            {isMobile ? (
              <>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Weather</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Weather />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Dog Walking Places</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DogWalkingPlaces />
                  </AccordionDetails>
                </Accordion>
              </>
            ) : (
              <Box>
                <Box mt={0}>
                  <Weather />
                </Box>
                <Box mt={2}>
                  <DogWalkingPlaces />
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={7}>
            <Card
              sx={{
                width: { xs: '86%', sm: '95%' },
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(1px)',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '94%'
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Welcome to Paw Mate!
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: '18px', lineHeight: 1.5, textAlign: 'center' }}
              >
                Paw Mate is your go-to platform for finding the perfect playdate for your pet.
                Whether you have a dog, cat, or any furry friend, Paw Mate helps you discover
                personalized playdates based on your pet&apos;s size, energy level, and personality.
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  mt: 5,
                  mb: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Key Features:
              </Typography>
              <List sx={{ bgcolor: 'transparent', fontSize: '18px' }}>
                <ListItem>
                  <ListItemIcon>
                    <PetsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="MY DOGS"
                    primaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }} // Apply dark font color to primary text
                    secondary="Access all your dogs' information, where you can add, edit, review, or delete their details."
                    secondaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }} // Apply dark font color to secondary text
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="FRIENDS"
                    primaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }} // Apply dark font color to primary text
                    secondary="View your friend list, see who has matched with you, and explore potential playdates for your pets."
                    secondaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }} // Apply dark font color to secondary text
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="MATCHING"
                    primaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }} // Apply dark font color to primary text
                    secondary="Engage in matching with other users' dogs to find compatible playmates for your furry companions."
                    secondaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }} // Apply dark font color to secondary text
                  />
                </ListItem>
              </List>
              <Typography
                variant="body1"
                sx={{ fontSize: '18px', lineHeight: 1.5, mt: 2, textAlign: 'center' }}
              >
                Start connecting with fellow pet owners and make your pet&apos;s social life more
                fun and exciting with Paw Mate!
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Welcome;
