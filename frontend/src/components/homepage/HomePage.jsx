import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import petImage from '../../images/homeDogImage.png';
import { APPLICATION_PATH } from '../../utils/urlRoutes';
import { CommonStyles } from '../common/CommonStyles';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(APPLICATION_PATH.dashboard);
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ height: '100vh' }} style={CommonStyles.homeContainerStyles}>
      <Box sx={{ height: '85.7vh' }}>
        <Box sx={{ ...CommonStyles.homeBoxStyles }}>
          <Typography variant="h1" sx={CommonStyles.homeTypographyStyles}>
            Paw Mate
          </Typography>
          <Typography variant="subtitle1" sx={CommonStyles.homeSubtitleStyles}>
            Find your pet&apos;s <strong>perfect playdate</strong>.<br />
            Discover personalized playdates for your pet&apos;s size, energy, and personality.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <ButtonLink to="/login" color="primary" icon={<VpnKeyIcon />}>
              Log in
            </ButtonLink>
            <ButtonLink to="/signup" color="success" icon={<PersonAddIcon />}>
              Sign Up
            </ButtonLink>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            transform: 'translateX(-50%)',
            zIndex: 1
          }}
        >
          <img
            src={petImage}
            alt="PawMate logo"
            style={{ width: '100%', height: 'auto', marginLeft: '30%' }}
          />
        </Box>
      </Box>
      <Box sx={{ height: '14.3vh', backgroundColor: 'white', width: '100%' }} />
    </Box>
  );
};

const ButtonLink = ({ to, color, icon, children }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Button variant="contained" startIcon={icon} color={color} sx={CommonStyles.homeButtonStyles}>
      {children}
    </Button>
  </Link>
);

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning'])
    .isRequired,
  icon: PropTypes.element,
  children: PropTypes.node.isRequired
};

export default HomePage;
