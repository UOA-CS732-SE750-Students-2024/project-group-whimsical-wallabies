//DogCardItem component for displaying each dog card in dashboard
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {
  Chip,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';

import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonStyles } from '../common/CommonStyles';

const FriendsDogCardItem = ({ id, image, name, gender, aboutMe, userId, dogId }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    const dogProfileUrl = `/dog/${userId}/${dogId}`;
    navigate(dogProfileUrl);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={CommonStyles.dogDashboardCard}>
        <CardActionArea onClick={handleViewClick}>
          <CardMedia
            component="img"
            height={300}
            image={`${process.env.REACT_APP_API_URL}/${image}`}
            alt={id}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: 'bold', color: '#2a2a2a' }}
            >
              {name}
            </Typography>
            {gender === 'Male' ? (
              <MaleIcon fontSize="small" style={{ color: '#6699ff' }} />
            ) : (
              <FemaleIcon fontSize="small" style={{ color: '#ff99cc' }} />
            )}
            <Typography variant="body2" color="text.secondary">
              {aboutMe}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={CommonStyles.cardActions}>
          <Chip label="View Profile" onClick={handleViewClick} sx={CommonStyles.chipButton} />
        </CardActions>
      </Card>
    </Grid>
  );
};

FriendsDogCardItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  aboutMe: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  dogId: PropTypes.string.isRequired
};

export default FriendsDogCardItem;
