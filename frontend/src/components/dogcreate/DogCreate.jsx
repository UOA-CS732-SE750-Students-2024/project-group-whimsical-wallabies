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
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateDogMutation } from '../../queries/dogs';
import { CommonStyles } from '../common/CommonStyles';
import { dogCreateSchema } from './DogCreate.validation';

function CreateDogForm() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(dogCreateSchema)
  });

  const { mutate: createDog, data, isLoading, error } = useCreateDogMutation();

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
        onSubmit={handleSubmit(createDog)}
        noValidate
        autoComplete="off"
        sx={CommonStyles.formContainer}
      >
        <Box sx={CommonStyles.formHeader}>
          <Typography variant="h4" component="h1" gutterBottom>
            New Dog Profile
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
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name ? errors.name.message : ''}
          disabled={isLoading}
        />
        <TextField
          id="breed"
          label="Breed"
          name="breed"
          margin="normal"
          fullWidth
          required
          {...register('breed')}
          error={Boolean(errors.breed)}
          helperText={errors.breed ? errors.breed.message : ''}
          disabled={isLoading}
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
          disabled={isLoading}
          sx={CommonStyles.autoCompleteBox}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="gender-label">Gender *</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            label="Gender"
            defaultValue=""
            {...register('gender')}
            error={Boolean(errors.gender)}
            disabled={isLoading}
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
          {...register('weight')}
          error={Boolean(errors.weight)}
          helperText={errors.weight ? errors.weight.message : ''}
          disabled={isLoading}
        />
        <TextField
          id="bio"
          name="bio"
          label="Bio"
          type="text"
          margin="normal"
          fullWidth
          required
          {...register('bio')}
          error={Boolean(errors.bio)}
          helperText={errors.bio ? errors.bio.message : ''}
          disabled={isLoading}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="neutered-label">Neutered *</InputLabel>
          <Select
            labelId="neutered-label"
            id="neutered"
            label="Neutered"
            defaultValue=""
            {...register('neutered')}
            error={Boolean(errors.neutered)}
            disabled={isLoading}
            sx={CommonStyles.selectDropdown}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <FormHelperText>{errors.gender ? errors.gender.message : ''}</FormHelperText>
        </FormControl>
        <TextField
          type="file"
          name="photo"
          label="Upload Dog Photo"
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={isLoading}
        />
        <CardActions disableSpacing sx={CommonStyles.cardActions}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            disabled={isLoading}
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

        {isLoading && <CircularProgress size={24} sx={CommonStyles.progressIndicator} />}
        {error && (
          <Alert severity="error" sx={CommonStyles.alert}>
            Failed to register: {error.message}
          </Alert>
        )}

        {data && (
          <Dialog
            open={Boolean(data)}
            onClose={() => {}}
            aria-labelledby="success-dialog-title"
            aria-describedby="success-dialog-description"
          >
            <DialogTitle id="success-dialog-title" sx={CommonStyles.dialogTitle}>
              New Dog Profile Created!
            </DialogTitle>
            <DialogContent sx={CommonStyles.dialogContent}>
              <DialogContentText
                id="success-dialog-description"
                sx={CommonStyles.dialogContentText}
              >
                Your new dog profile has been successfully created.
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

export default CreateDogForm;
