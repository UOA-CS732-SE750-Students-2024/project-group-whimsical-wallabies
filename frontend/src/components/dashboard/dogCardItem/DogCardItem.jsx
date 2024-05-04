import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {
  Chip,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';

import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DogCardItem = ({ id, image, name, gender, aboutMe }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/dog/${id}`);
  };

  return (
    <Card sx={{ width: 350, height: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={300}
          image={`http://localhost:3001/${image}`}
          alt={id}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Chip
          label="View Profile"
          onClick={handleViewClick}
          sx={{
            mr: 1,
            backgroundColor: '#f5f5f5',
            color: '#4da6ff',
            '&:hover': {
              backgroundColor: '#e0e0e0'
            }
          }}
        />
      </CardActions>
    </Card>
  );
};
DogCardItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  aboutMe: PropTypes.string.isRequired
};

export default DogCardItem;
