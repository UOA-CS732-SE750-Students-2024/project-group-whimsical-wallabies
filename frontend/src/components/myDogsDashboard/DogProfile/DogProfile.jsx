import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FemaleIcon from '@mui/icons-material/Female';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MaleIcon from '@mui/icons-material/Male';
import PetsIcon from '@mui/icons-material/Pets';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetDog, useDeleteDogMutation } from '../../../queries/dogs';
import { APPLICATION_PATH } from '../../../utils/urlRoutes';
import DogCreateUpdateDialog from '../DogCreateUpdateDialog';
import DogPhotoGallery from '../DogPhotoGallery/DogPhotoGallery';

const getAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let ageInYears = today.getFullYear() - birthDate.getFullYear();
  let ageInMonths = today.getMonth() - birthDate.getMonth();
  if (ageInMonths < 0 || (ageInMonths === 0 && today.getDate() < birthDate.getDate())) {
    ageInYears--;
    ageInMonths += 12;
  }
  return `${ageInYears} years ${ageInMonths} months`;
};

const DogAttributes = ({ breed, dob, weight, neutered, bio }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Attribute icon={<PetsIcon />} label={breed} />
      <Attribute icon={<EmojiEventsIcon />} label={`Age: ${getAge(dob)}`} />
      <Attribute icon={<FitnessCenterIcon />} label={`Weight: ${weight} kg`} />
      <Attribute icon={<FavoriteBorderIcon />} label={`Neutered: ${neutered ? 'Yes' : 'No'}`} />
      <Typography variant="body1" gutterBottom mt={2}>
        About Me:
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {bio}
      </Typography>
    </Box>
  );
};

DogAttributes.propTypes = {
  breed: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  bio: PropTypes.string.isRequired,
  neutered: PropTypes.bool.isRequired
};

const Attribute = ({ icon, label }) => {
  return (
    <Box mt={2} display="flex" alignItems="center">
      {icon}
      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
        {label}
      </Typography>
    </Box>
  );
};

Attribute.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
};

const DeleteConfirmationDialog = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Dog Profile</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this dog profile?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default function DogProfile() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data: dog, isLoading, isError } = useGetDog(id);
  const { mutate: deleteDog } = useDeleteDogMutation(id);

  const handleDeleteOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    deleteDog(dog._id, {
      onSuccess: () => {
        handleDeleteClose();
        navigate(APPLICATION_PATH.dog.dashboard);
        console.log('Dog profile deleted successfully');
      }
    });
  };

  if (isLoading) return <CircularProgress />;

  if (isError) {
    return <Typography variant="h6">Error loading dogs.</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {dog ? (
        <>
          <Card sx={{ maxWidth: 630, width: '100%', height: '100%' }}>
            <CardMedia
              component="img"
              height="400"
              image={`${process.env.REACT_APP_API_URL}/${dog.profilePicture}`}
              alt={dog.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'bold'
                }}
              >
                {dog.name}
                {dog.gender === 'Male' ? (
                  <MaleIcon
                    fontSize="small"
                    sx={{ verticalAlign: 'middle', ml: 1 }}
                    style={{ color: '#6699ff' }}
                  />
                ) : (
                  <FemaleIcon
                    fontSize="small"
                    sx={{ verticalAlign: 'middle', ml: 1 }}
                    style={{ color: '#ff99cc' }}
                  />
                )}
              </Typography>

              <DogAttributes
                bio={dog.bio}
                breed={dog.breed}
                dob={dog.dob}
                neutered={dog.neutered}
                weight={dog.weight}
              />

              <Box mt={2} display="flex" justifyContent="flex-end">
                <DogCreateUpdateDialog dogId={id} />
                <Tooltip title="Delete">
                  <IconButton onClick={handleDeleteOpen}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>

          <Box display="flex" justifyContent="center" alignItems="center">
            <DogPhotoGallery id={dog._id} />
          </Box>
        </>
      ) : (
        <Typography variant="h6">No dog found with the provided ownerId and id.</Typography>
      )}
      <DeleteConfirmationDialog
        onClose={handleDeleteClose}
        onDelete={handleDelete}
        open={openDeleteDialog}
      />
    </Box>
  );
}
