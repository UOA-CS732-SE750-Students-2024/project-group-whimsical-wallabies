import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import React from 'react';

export default function DogCardItem({ id, image, name, gender, owner, about_me }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={id} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          {gender === 'Male' ? <MaleIcon /> : <FemaleIcon />}
          <Typography variant="body2" color="text.secondary">
            {about_me}
          </Typography>
          <Typography variant="body1">Owner: {owner}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          More
        </Button>
      </CardActions>
    </Card>
  );
}
DogCardItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  about_me: PropTypes.string.isRequired
};
