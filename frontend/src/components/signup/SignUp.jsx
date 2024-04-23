import { joiResolver } from '@hookform/resolvers/joi';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { commonStyles } from '../common/commonStyles';
import { signupSchema } from './SignUp.validation';

const SignUp = () => {
  const { signup, signupErrors, isPendingSignup, isSignup, setIsSignup } = useAuth();

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(signupSchema)
  });

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
      sx={commonStyles.formContainer}
    >
      <Box sx={commonStyles.formHeader}>
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
        <TextField
          id="address"
          name="address"
          label="Address"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            )
          }}
          placeholder="Enter your address"
          margin="normal"
          fullWidth
          required
          {...register('address')}
          error={Boolean(errors.address)}
          helperText={errors.address ? errors.address.message : ''}
          disabled={isPendingSignup}
        />
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
      <CardActions disableSpacing sx={commonStyles.cardActions}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          sx={commonStyles.actionButton}
        >
          Register
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          startIcon={<VpnKeyIcon />}
          onClick={handleLoginClick}
          sx={commonStyles.actionButton}
        >
          Login
        </Button>
      </CardActions>

      {/* Progress Indicator and Alert */}
      {isPendingSignup && <CircularProgress size={24} sx={commonStyles.progressIndicator} />}
      {signupErrors && (
        <Alert severity="error" sx={commonStyles.alert}>
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
        <DialogTitle id="success-dialog-title" sx={commonStyles.dialogTitle}>
          Registration is Successful!
        </DialogTitle>
        <DialogContent sx={commonStyles.dialogContent}>
          <DialogContentText id="success-dialog-description" sx={commonStyles.dialogContentText}>
            Your account has been successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={commonStyles.dialogAction}>
          <Button
            onClick={() => handleDialogButtonClick()}
            variant="contained"
            color="primary"
            sx={commonStyles.dialogButton}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SignUp;
