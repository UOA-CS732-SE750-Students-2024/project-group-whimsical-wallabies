import { yupResolver } from '@hookform/resolvers/yup';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Button,
  MenuItem
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  useGetDogById,
  useUpdateDogMutation,
  useCreateDogMutation,
  useUploadDogProfilePictureMutation
} from '../../../queries/dogs';
import { CommonStyles } from '../../common/CommonStyles';
import { dogCreateSchema } from '../DogCreate';
import { dogUpdateSchema } from '../DogUpdate';

const defaultValues = {
  name: '',
  breed: '',
  dob: new Date(),
  owner: '',
  gender: '',
  weight: '',
  bio: '',
  neutered: false
};

const DogFormBase = ({ dogId }) => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const { data: dog, isLoading } = useGetDogById(dogId, { enabled: !!dogId });
  const { mutate: mutateUploadDogProfilePicture } = useUploadDogProfilePictureMutation({
    onSuccess: () => navigate('/')
  });
  const { mutate: mutateUpdateDog, error: mutateUpdateDogError } = useUpdateDogMutation(dogId, {
    onSuccess: () => {
      if (!profilePicture) navigate('/');
      return mutateUploadDogProfilePicture({ dogId, profilePicture });
    }
  });
  const { mutate: mutateCreateDog, error: mutateCreateDogError } = useCreateDogMutation({
    onSuccess: (newDog) => {
      if (!profilePicture) navigate('/');
      return mutateUploadDogProfilePicture({ dogId: newDog._id, profilePicture });
    }
  });
  const mutationError = mutateUpdateDogError || mutateCreateDogError;

  const { control, handleSubmit, reset, setError } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver((dogId && dogUpdateSchema) || dogCreateSchema, {
      abortEarly: false,
      stripUnknown: true
    })
  });

  useEffect(() => {
    const serverErrors = mutationError?.response?.data?.fields;
    if (serverErrors) {
      Object.keys(serverErrors).forEach((fieldName) => {
        setError(fieldName, {
          type: 'server',
          message: serverErrors[fieldName]
        });
      });
    }
  }, [mutationError, setError]);

  useEffect(() => {
    if (dog) {
      reset(dog);
    }
  }, [dog, reset]);

  const mutationFunction = (dogId && mutateUpdateDog) || mutateCreateDog;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePicture(file);
    } else {
      setProfilePicture(null);
    }
  };

  if (isLoading && !dogId) return <div>Loading...</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(mutationFunction)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!error}
                disabled={isLoading}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="dob"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Date of Birth"
              views={['year', 'month', 'day']}
              openTo="year"
              value={field?.value ? dayjs(field.value) : null}
              onChange={field.onChange}
              disabled={isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          )}
        />
        <Controller
          name="breed"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Breed"
                fullWidth
                margin="normal"
                error={!!error}
                disabled={isLoading}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                select
                label="Gender"
                fullWidth
                margin="normal"
                error={!!error}
                disabled={isLoading}
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </TextField>
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="weight"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Weight"
                type="number"
                fullWidth
                margin="normal"
                error={!!error}
                disabled={isLoading}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Bio"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                error={!!error}
                disabled={isLoading}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="neutered"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} onChange={field.onChange} />}
                label="Neutered"
                disabled={isLoading}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <TextField
          type="file"
          name="profilePicture"
          label="Upload Dog Photo"
          onChange={handleImageChange}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={isLoading}
        />
        {mutationError && <p>An error occurred: {mutationError.message}</p>}
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
          disabled={isLoading}
          startIcon={<UndoIcon />}
          onClick={() => reset((dog && dog) || defaultValues)}
          sx={CommonStyles.actionButton}
        >
          Clear
        </Button>
      </form>
    </LocalizationProvider>
  );
};

DogFormBase.propTypes = {
  dogId: PropTypes.string
};

export default DogFormBase;
