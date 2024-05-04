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
  DialogTitle,
  FormHelperText
} from '@mui/material';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

const defaultValues = {
  aboutMe: '',
  username: '',
  address: '',
  phone: '',
  password: '',
  confirmPassword: '',
  email: '',
  latitude: '',
  longitude: ''
};

const SignUp = () => {
  const { signup, signupErrors, isPendingSignup, isSignup, setIsSignup } = useAuth();
  let navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: joiResolver(signupSchema, {
      abortEarly: false,
      stripUnknown: true
    })
  });
  const { isLoaded } = useJsApiLoader({
    // eslint-disable-next-line no-undef
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

        setValue('latitude', place.geometry.location.lat().toString(), { shouldValidate: false });
        setValue('longitude', place.geometry.location.lng().toString(), { shouldValidate: false });
        setValue('address', place.formatted_address, { shouldValidate: true });

        setAddressError(''); // Clear any existing error message
        setIsAddressValid(true); // Set isAddressValid to true indicating a valid address has been selected
      } else {
        setAddressError('Please select a valid street address from the dropdown.');
        setIsAddressValid(false);
      }
    }
  };

  const handleAddressBlur = () => {
    if (!isAddressValid) {
      setAddressError('Please select a valid address from the dropdown.');
      setValue('latitude', '', { shouldValidate: false });
      setValue('longitude', '', { shouldValidate: false });
    }
  };

  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
    setIsAddressValid(false);

    if (!newAddress || newAddress.length < 3) {
      setValue('latitude', '', { shouldValidate: false });
      setValue('longitude', '', { shouldValidate: false });
      setAddressError('Address is too short.');
    } else {
      debouncedSearch(newAddress);
    }
  };

  const debouncedSearch = useCallback((value) => {
    const debounced = debounce((value) => {
      if (autocompleteRef.current) {
        autocompleteRef.current.set('input', value);
      }
    }, 500);
    debounced(value);
  }, []);

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

  console.log(errors, 'errors');
  console.log(signupErrors, 'errors signupErrors');

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
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
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
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactMailIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Phone"
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
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
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    margin="normal"
                    // error={!!error}
                    value={address}
                    onChange={handleAddressChange}
                    onBlur={handleAddressBlur} // Add onBlur event handler here
                    error={Boolean(errors.address) || addressError !== ''}
                    helperText={errors.address ? errors.address.message : addressError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      )
                    }}
                    sx={CommonStyles.autoCompleteBox}
                    disabled={isPendingSignup}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
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
              disabled={true}
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
              disabled={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Controller
          name="aboutMe"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="About Me"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                error={!!error}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
      </Grid>
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
