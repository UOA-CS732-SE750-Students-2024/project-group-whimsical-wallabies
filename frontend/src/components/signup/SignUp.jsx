import { joiResolver } from '@hookform/resolvers/joi';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PasswordIcon from '@mui/icons-material/Password';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Alert,
  CircularProgress,
  TextField,
  Button,
  InputAdornment,
  CardActions,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CommonStyles } from '../common/CommonStyles';
import { signupSchema } from './SignUp.validation';

const libraries = ['places'];

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

const SignUp = () => {
  const { signup, signupErrors, isPendingSignup, isSignup, setIsSignup } = useAuth();
  let navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(signupSchema)
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const autocompleteRef = useRef(null);

  useEffect(() => {
    register('address');
  }, [register]);

  useEffect(() => {
    const serverErrors = signupErrors?.response?.data?.fields;
    if (serverErrors) {
      Object.keys(serverErrors).forEach((fieldName) => {
        setError(fieldName, {
          type: 'server',
          message: serverErrors[fieldName]
        });
      });
    }
  }, [signupErrors, setError]);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const [addressError, setAddressError] = useState('');

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address && place.geometry) {
        // Valid address
        setAddress(place.formatted_address);
        setLatitude(place.geometry.location.lat().toString());
        setLongitude(place.geometry.location.lng().toString());
        setAddressError(''); // Clear any existing error message
        setIsAddressValid(true); // Set isAddressValid to true indicating a valid address has been selected
      } else {
        setAddressError('Please select a valid street address from the dropdown.');
        setIsAddressValid(false);
      }
    }

    console.log(isAddressValid);
  };

  const handleAddressBlur = () => {
    if (!isAddressValid) {
      setAddressError('Please select a valid address from the dropdown.');
      setLatitude('');
      setLongitude('');
    }
  };

  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
    setIsAddressValid(false);

    if (!newAddress || newAddress.length < 3) {
      setLatitude('');
      setLongitude('');
      setAddressError('Address is too short.');
    } else {
      debouncedSearch(newAddress);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (autocompleteRef.current) {
        autocompleteRef.current.set('input', value);
      }
    }, 500),
    []
  );

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDialogClose = () => {
    setIsSignup(false);
    reset();
  };

  const handleDialogButtonClick = () => {
    handleDialogClose();
    navigate('/login');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(signup)}
      noValidate
      autoComplete="off"
      sx={CommonStyles.formContainer}
    >
      <Box sx={CommonStyles.formHeader}>
        <Typography variant="h4" component="h1" gutterBottom>
          Signup Form
        </Typography>
        <Typography variant="subtitle" component="p">
          Please fill out the form to register.
        </Typography>
      </Box>

      <Box>
        <TextField
          id="username"
          label="Username"
          name="username"
          placeholder="Enter your name"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
          fullWidth
          autoFocus
          required
          {...register('username')}
          error={Boolean(errors.username)}
          helperText={errors.username ? errors.username.message : ''}
          disabled={isPendingSignup}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          id="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            )
          }}
          placeholder="Enter a password"
          margin="normal"
          fullWidth
          required
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : ''}
          disabled={isPendingSignup}
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            )
          }}
          placeholder="Enter your confirm password"
          margin="normal"
          fullWidth
          required
          {...register('confirmpassword')}
          error={Boolean(errors.confirmpassword)}
          helperText={errors.confirmpassword ? errors.confirmpassword.message : ''}
          disabled={isPendingSignup}
        />
        <TextField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactMailIcon />
              </InputAdornment>
            )
          }}
          placeholder="Enter your email address"
          margin="normal"
          fullWidth
          required
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : ''}
          disabled={isPendingSignup}
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
              value={address}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur} // Add onBlur event handler here
              error={Boolean(errors.address) || addressError !== ''}
              helperText={errors.address ? errors.address.message : addressError}
              disabled={isPendingSignup}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                )
              }}
              sx={CommonStyles.autoCompleteBox}
            />
          </Autocomplete>
        ) : (
          <CircularProgress />
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="latitude"
              name="latitude"
              label="Latitude"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MyLocationIcon />
                  </InputAdornment>
                )
              }}
              inputProps={{
                readOnly: true
              }}
              margin="normal"
              fullWidth
              {...register('latitude')}
              value={latitude}
              error={Boolean(errors.latitude)}
              helperText={errors.latitude ? errors.latitude.message : ''}
              disabled={isPendingSignup}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="longitude"
              name="longitude"
              label="Longitude"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MyLocationIcon />
                  </InputAdornment>
                )
              }}
              inputProps={{
                readOnly: true
              }}
              margin="normal"
              fullWidth
              {...register('longitude')}
              value={longitude}
              error={Boolean(errors.longitude)}
              helperText={errors.longitude ? errors.longitude.message : ''}
              disabled={isPendingSignup}
            />
          </Grid>
        </Grid>
        <TextField
          id="phone"
          name="phone"
          label="Phone"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ContactPhoneIcon />
              </InputAdornment>
            )
          }}
          placeholder="Enter your phone number"
          margin="normal"
          fullWidth
          {...register('phone')}
          error={Boolean(errors.phone)}
          helperText={errors.phone ? errors.phone.message : ''}
          disabled={isPendingSignup}
        />
      </Box>
      <CardActions disableSpacing sx={CommonStyles.cardActions}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          disabled={!isAddressValid || isPendingSignup}
          sx={CommonStyles.actionButton}
        >
          Register
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          startIcon={<VpnKeyIcon />}
          onClick={handleLoginClick}
          sx={CommonStyles.actionButton}
        >
          Login
        </Button>
      </CardActions>

      {/* Progress Indicator and Alert */}
      {isPendingSignup && <CircularProgress size={24} sx={CommonStyles.progressIndicator} />}
      {signupErrors && (
        <Alert severity="error" sx={CommonStyles.alert}>
          Failed to register:{' '}
          {signupErrors?.response?.data?.error || signupErrors.response.data?.message}
        </Alert>
      )}

      {/* Success Dialog */}
      <Dialog
        open={isSignup}
        onClose={() => handleDialogClose()}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title" sx={CommonStyles.dialogTitle}>
          Registration is Successful!
        </DialogTitle>
        <DialogContent sx={CommonStyles.dialogContent}>
          <DialogContentText id="success-dialog-description" sx={CommonStyles.dialogContentText}>
            Your account has been successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={CommonStyles.dialogAction}>
          <Button
            onClick={() => handleDialogButtonClick()}
            variant="contained"
            color="primary"
            sx={CommonStyles.dialogButton}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SignUp;
