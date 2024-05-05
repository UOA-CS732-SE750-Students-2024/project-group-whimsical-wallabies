import { joiResolver } from '@hookform/resolvers/joi';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Button } from '@mui/material';
import { TextField, InputAdornment, Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useGetUser } from '../../context/AuthContext.queries';
import { CommonStyles } from '../common/CommonStyles';
import { userProfileSchema } from './userProfile.validation';

const libraries = ['places'];

const UserProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();

  const [userData, setUserData] = useState(null);
  const { data: currentUserData, isLoading } = useGetUser(currentUser?.username);

  const [edit, setEdit] = useState(false);

  const {
    register,
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
        <TextField
          id="username"
          label="Username"
          name="username"
          margin="normal"
          {...register('username')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
            readOnly: true
          }}
          fullWidth
          defaultValue={currentUserData.username}
        />

        <TextField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          margin="normal"
          {...register('email')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactMailIcon />
              </InputAdornment>
            ),
            readOnly: !edit
          }}
          fullWidth
          defaultValue={currentUserData.email}
        />
        <TextField
          id="aboutMe"
          name="aboutMe"
          label="About Me"
          margin="normal"
          {...register('aboutMe')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
            readOnly: !edit
          }}
          fullWidth
          defaultValue={currentUserData.aboutMe}
        />

        {isLoaded ? (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <TextField
              id="address"
              name="address"
              label="Address"
              type="text"
              placeholder="Enter your address"
              fullWidth
              required
              {...register('address')}
              defaultValue={currentUserData.address}
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
          </Autocomplete>
        ) : (
          <CircularProgress />
        )}

        <TextField
          id="phone"
          name="phone"
          label="Phone"
          type="text"
          margin="normal"
          {...register('phone')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactPhoneIcon />
              </InputAdornment>
            ),
            readOnly: !edit
          }}
          fullWidth
          defaultValue={currentUserData.phone}
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
        <Button variant="contained" color="primary" onClick={handleEdit} disabled={edit}>
          Edit
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSave}
          disabled={!edit}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
