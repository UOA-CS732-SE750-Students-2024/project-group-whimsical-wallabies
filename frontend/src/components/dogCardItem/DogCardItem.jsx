import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Chip, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DogCardItem({ id, image, name, gender, about_me }) {
  let navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/dog/${id}`); // Navigate to the dog profile
    console.log('View clicked');
  };

  return (
    <Card sx={{ width: 350, height: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={300}
          image={image}
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
            {about_me}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Chip
          label="Vew Profile"
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
}
DogCardItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  about_me: PropTypes.string.isRequired
};
