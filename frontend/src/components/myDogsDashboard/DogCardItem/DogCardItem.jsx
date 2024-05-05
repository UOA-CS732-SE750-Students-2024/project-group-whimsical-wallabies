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
import { CommonStyles } from '../../common/CommonStyles';
import DogCreateUpdateDialog from '../DogCreateUpdateDialog';

const DogCardItem = ({ id, image, name, gender, aboutMe }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/dog/${id}`);
  };

  return (
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
      <CardActions sx={CommonStyles.cardActions}>
        <Chip label="View Profile" onClick={handleViewClick} sx={CommonStyles.chipButton} />
        <DogCreateUpdateDialog dogId={id} />
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
