import { joiResolver } from '@hookform/resolvers/joi';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import {
  Box,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateDogMutation, useGetDogById } from '../../queries/dogs';
import { CommonStyles } from '../common/CommonStyles';
import { dogUpdateSchema } from './DogUpdate.validation';

function UpdateDogForm() {
  const { dogId } = useParams();

  const { data, isLoading } = useGetDogById(dogId);

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  // /const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [bio, setBio] = useState('');
  const [neutered, setNeutered] = useState('');

  useEffect(() => {
    if (!isLoading && data) {
      setName(data.name);
      setBreed(data.breed);
      setGender(data.gender);
      setWeight(data.weight);
      setBio(data.bio);
      setNeutered(data.neutered);
    }
  }, [data, isLoading, setName, setBreed, setGender, setWeight, setBio, setNeutered]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(dogUpdateSchema)
  });

  const { mutate: updateDog, savedData, isUpdateLoading, errorUpdate } = useUpdateDogMutation();

  let navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleDialogButtonClick = () => {
    navigate('/');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit(updateDog)}
        noValidate
        autoComplete="off"
        sx={CommonStyles.formContainer}
      >
        <Box sx={CommonStyles.formHeader}>
          <Typography variant="h4" component="h1" gutterBottom>
            Update Dog Profile
          </Typography>
        </Box>

        <TextField
          id="name"
          label="Name"
          name="name"
          margin="normal"
          fullWidth
          autoFocus
          required
          value={name}
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name ? errors.name.message : ''}
          disabled={isUpdateLoading}
        />
        <TextField
          id="breed"
          label="Breed"
          name="breed"
          margin="normal"
          fullWidth
          required
          value={breed}
          {...register('breed')}
          error={Boolean(errors.breed)}
          helperText={errors.breed ? errors.breed.message : ''}
          disabled={isUpdateLoading}
        />
        <DatePicker
          id="dob"
          name="dob"
          label="Date of Birth"
          renderInput={(params) => <TextField {...params} />}
          margin="normal"
          slotProps={{ textField: { fullWidth: true } }}
          required
          {...register('dob')}
          error={Boolean(errors.dob)}
          helperText={errors.dob ? errors.dob.message : ''}
          disabled={isUpdateLoading}
          sx={CommonStyles.autoCompleteBox}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="gender-label">Gender *</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            label="Gender"
            defaultValue={gender}
            {...register('gender')}
            error={Boolean(errors.gender)}
            disabled={isUpdateLoading}
            sx={CommonStyles.selectDropdown}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
        </FormControl>
        <TextField
          id="weight"
          name="weight"
          label="Weight"
          type="number"
          margin="normal"
          fullWidth
          required
          value={weight}
          {...register('weight')}
          error={Boolean(errors.weight)}
          helperText={errors.weight ? errors.weight.message : ''}
          disabled={isUpdateLoading}
        />
        <TextField
          id="bio"
          name="bio"
          label="Bio"
          type="text"
          margin="normal"
          fullWidth
          required
          value={bio}
          {...register('bio')}
          error={Boolean(errors.bio)}
          helperText={errors.bio ? errors.bio.message : ''}
          disabled={isUpdateLoading}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="neutered-label">Neutered *</InputLabel>
          <Select
            labelId="neutered-label"
            id="neutered"
            label="Neutered"
            defaultValue={neutered}
            {...register('neutered')}
            error={Boolean(errors.neutered)}
            disabled={isUpdateLoading}
            sx={CommonStyles.selectDropdown}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
        </FormControl>
        <TextField
          type="file"
          id="profilePicture"
          name="profilePicture"
          label="Upload Dog Photo"
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={isUpdateLoading}
        />
        <CardActions disableSpacing sx={CommonStyles.cardActions}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            disabled={isUpdateLoading}
            sx={CommonStyles.actionButton}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            startIcon={<UndoIcon />}
            onClick={handleBackClick}
            sx={CommonStyles.actionButton}
          >
            Back
          </Button>
        </CardActions>

        {isUpdateLoading && <CircularProgress size={24} sx={CommonStyles.progressIndicator} />}
        {errorUpdate && (
          <Alert severity="error" sx={CommonStyles.alert}>
            Failed to update: {errorUpdate.message}
          </Alert>
        )}

        {savedData && (
          <Dialog
            open={Boolean(savedData)}
            onClose={() => {}}
            aria-labelledby="success-dialog-title"
            aria-describedby="success-dialog-description"
          >
            <DialogTitle id="success-dialog-title" sx={CommonStyles.dialogTitle}>
              Dog Profile Updated!
            </DialogTitle>
            <DialogContent sx={CommonStyles.dialogContent}>
              <DialogContentText
                id="success-dialog-description"
                sx={CommonStyles.dialogContentText}
              >
                Your dog profile has been successfully updated.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={CommonStyles.dialogAction}>
              <Button
                onClick={() => handleDialogButtonClick()}
                variant="contained"
                color="primary"
                startIcon={<HighlightOffIcon />}
                sx={CommonStyles.dialogButton}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default UpdateDogForm;
