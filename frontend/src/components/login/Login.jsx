import { joiResolver } from '@hookform/resolvers/joi';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Alert, CircularProgress, Box, TextField, Typography, Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto', // Keeps the height dynamic based on content
        minHeight: '55vh', // Ensures minimum vertical space is covered
        mt: 1,
        p: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
        width: '80%', // Control width more precisely
        maxWidth: '600px', // Further reduced width for a more compact form
        mx: 'auto', // Horizontally center in the available space
        my: 15 // Vertically center (applied along with minHeight)
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', // Changed to row to align items side by side
          alignItems: 'center', // Align items vertically in the center
          justifyContent: 'center', // Horizontally center the items
          mb: 2
        }}
      >
        <Box
          component="img"
          src="/logo.png" // Adjust the src path to the correct one for your setup
          sx={{
            width: 60,
            height: 60,
            mr: 1 // Add some margin to the right of the logo
          }}
        />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
          PawMate
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(login)} noValidate>
        {/* Text Fields */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
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
          margin="normal"
          required
          fullWidth
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
        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            width: '100%', // Ensure the container spans the full width of the form
            mt: 2, // Margin top for spacing from the last form element
            gap: 1 // Creates space between the buttons
          }}
        >
          {/* Login Button with Icon */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<VpnKeyIcon />} // Adding the icon
            sx={{
              flexGrow: 1, // Allows the button to grow to fill the container
              height: 48, // Consistent height for touchability
              borderRadius: '20px' // Rounded corners
            }}
          >
            Login
          </Button>

          {/* Sign Up Button with Icon */}
          <Button
            type="button"
            variant="contained"
            color="secondary"
            startIcon={<PersonAddIcon />} // Adding the icon
            onClick={handleSignUpClick} // Handle the click event
            sx={{
              flexGrow: 1, // Allows the button to grow to fill the container
              height: 48, // Consistent height for touchability
              borderRadius: '20px' // Rounded corners
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Progress Indicator and Alert */}
        {isPendingLogin && (
          <CircularProgress size={24} sx={{ display: 'block', margin: '10px auto' }} />
        )}
        {loginErrors && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            Failed to login:{' '}
            {loginErrors?.response?.data?.error || loginErrors.response.data?.message}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Login;
