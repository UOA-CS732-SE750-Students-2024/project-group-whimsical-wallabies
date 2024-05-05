import { joiResolver } from '@hookform/resolvers/joi';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Button } from '@mui/material';
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
  CircularProgress,
  Grid,
  CardActions,
  FormHelperText
} from '@mui/material';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import React, { useRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useGetUser } from '../../context/AuthContext.queries';
import { useUpdateUserMutation } from '../../queries/user.js';
import { userDataStorage } from '../../utils/localStorageNames';
import { CommonStyles } from '../common/CommonStyles';
import { userProfileSchema } from './userProfile.validation';

const libraries = ['places'];

const UserProfile = () => {
  const { mutate: updateUserProfile } = useUpdateUserMutation((userProfile) => {
    userDataStorage.save(userProfile.data);
    setUser(userProfile.data);
  });

  const { currentUser, setUser } = useAuth();

  const [userData, setUserData] = useState(null);
  const { data: currentUserData, isLoading } = useGetUser(currentUser?.username);

  const [edit, setEdit] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(userProfileSchema)
  });

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const autocompleteRef = useRef(null);

  useEffect(() => {
    register('address');
  }, [register]);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address && place.geometry) {
        setAddress(place.formatted_address);
        const lat = place.geometry.location.lat().toString();
        const lng = place.geometry.location.lng().toString();
        setLatitude(lat);
        setLongitude(lng);
        setValue('address', place.formatted_address, { shouldValidate: true });
        setValue('latitude', lat); // add this
        setValue('longitude', lng); // add this
        setIsAddressValid(true);
      } else {
        setIsAddressValid(false);
      }
    }
    console.log(isAddressValid);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    currentUserData.address = address;
    currentUserData.latitude = latitude;
    currentUserData.longitude = longitude;
    setEdit(false);
    handleSubmit(updateUserProfile)();
  };

  useEffect(() => {
    if (!isLoading && currentUserData) {
      setUserData(currentUserData);
      setAddress(currentUserData.address);
      setLatitude(currentUserData.latitude);
      setLongitude(currentUserData.longitude);
    }
  }, [isLoading, currentUserData]);

  if (!userData) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={CommonStyles.formContainer}
      onSubmit={handleSubmit(updateUserProfile)}
    >
      <Box sx={CommonStyles.formHeader}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="subtitle" component="p">
          Your account details.
        </Typography>
      </Box>

      <Box>
        <Controller
          name="username"
          control={control}
          defaultValue={currentUserData.username}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                id="username"
                label="Username"
                fullWidth
                autoFocus
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  readOnly: true
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue={currentUserData.email}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                id="email"
                name="email"
                label="Email Address"
                type="email"
                margin="normal"
                fullWidth
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactMailIcon />
                    </InputAdornment>
                  ),
                  readOnly: !edit
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="aboutMe"
          control={control}
          defaultValue={currentUserData.aboutMe}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                id="aboutMe"
                name="aboutMe"
                label="About Me"
                margin="normal"
                fullWidth
                error={!!error}
                rows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  readOnly: !edit
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        {isLoaded ? (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Controller
              name="address"
              control={control}
              defaultValue={currentUserData.address}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    id="address"
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Enter your address"
                    fullWidth
                    required
                    error={Boolean(errors.address)}
                    helperText={errors.address ? errors.address.message : ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                      readOnly: !edit
                    }}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Autocomplete>
        ) : (
          <CircularProgress />
        )}

        <Controller
          name="phone"
          control={control}
          defaultValue={currentUserData.phone}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                id="phone"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneIcon />
                    </InputAdornment>
                  ),
                  readOnly: !edit
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="latitude"
              name="latitude"
              label="Latitude"
              type="text"
              {...register('latitude')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MyLocationIcon />
                  </InputAdornment>
                )
              }}
              inputProps={{
                readOnly: !edit
              }}
              margin="normal"
              fullWidth
              value={latitude}
              error={Boolean(errors.latitude)}
              helperText={errors.latitude ? errors.latitude.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="longitude"
              name="longitude"
              label="Longitude"
              type="text"
              {...register('latitude')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MyLocationIcon />
                  </InputAdornment>
                )
              }}
              inputProps={{
                readOnly: !edit
              }}
              margin="normal"
              fullWidth
              {...register('longitude')}
              value={longitude}
              error={Boolean(errors.longitude)}
              helperText={errors.longitude ? errors.longitude.message : ''}
            />
          </Grid>
        </Grid>
        <CardActions disableSpacing sx={CommonStyles.cardActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
            disabled={edit}
            sx={CommonStyles.actionButton}
          >
            Edit
          </Button>
        </CardActions>
        <CardActions disableSpacing sx={CommonStyles.cardActions}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleSave}
            disabled={!edit}
            sx={CommonStyles.actionButton}
          >
            Save
          </Button>
        </CardActions>
      </Box>
    </Box>
  );
};

export default UserProfile;
