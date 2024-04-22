import { joiResolver } from '@hookform/resolvers/joi';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Alert,
  CircularProgress,
  Box,
  TextField,
  Typography,
  Button,
  CardActions
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { commonStyles } from '../common/commonStyles';
import { loginSchema } from './Login.validation';

const Login = () => {
  const { login, loginErrors, isAuthenticated, isPendingLogin } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema)
  });

  useEffect(() => {
    const serverErrors = loginErrors?.response?.data?.fields;
    if (serverErrors) {
      Object.keys(serverErrors).forEach((fieldName) => {
        setError(fieldName, {
          type: 'server',
          message: serverErrors[fieldName]
        });
      });
    }
  }, [loginErrors, setError]);

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the signup route
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(login)}
      noValidate
      sx={{ ...commonStyles.formContainer, ...commonStyles.loginFormContainer }}
    >
      <Box sx={commonStyles.loginHeaderContainer}>
        <Box component="img" src="/logo.png" sx={commonStyles.loginHeaderImage} />
        <Typography variant="h4" gutterBottom sx={commonStyles.loginHeaderText}>
          PawMate
        </Typography>
      </Box>

      <Box>
        {/* Text Fields */}
        <TextField
          autoFocus
          required
          fullWidth
          margin="normal"
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            )
          }}
          {...register('username')}
          error={Boolean(errors.username)}
          helperText={errors.username ? errors.username.message : ''}
          disabled={isPendingLogin}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          id="password"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            )
          }}
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : ''}
          disabled={isPendingLogin}
        />
      </Box>
      <CardActions disableSpacing sx={commonStyles.cardActions}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<VpnKeyIcon />}
          sx={commonStyles.actionButton}
        >
          Login
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleSignUpClick}
          sx={commonStyles.actionButton}
        >
          Register
        </Button>
      </CardActions>

      {/* Progress Indicator and Alert */}
      {isPendingLogin && <CircularProgress size={24} sx={commonStyles.progressIndicator} />}
      {loginErrors && (
        <Alert severity="error" sx={commonStyles.alert}>
          Failed to login:{' '}
          {loginErrors?.response?.data?.error || loginErrors.response.data?.message}
        </Alert>
      )}
    </Box>
  );
};

export default Login;
