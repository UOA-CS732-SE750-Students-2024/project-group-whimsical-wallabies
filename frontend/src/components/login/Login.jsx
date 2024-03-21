import { joiResolver } from '@hookform/resolvers/joi';
import { Alert, CircularProgress, Box, Button, TextField, Typography } from '@mui/material';
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // Use 100% of the viewport height
      }}
    >
      <Typography variant="h2" gutterBottom>
        PawMate
      </Typography>
      <Box component="form" onSubmit={handleSubmit(login)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
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
          autoComplete="current-password"
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : ''}
          disabled={isPendingLogin}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isPendingLogin}
        >
          Login
        </Button>
        {isPendingLogin && <CircularProgress size={24} />}
      </Box>
      {loginErrors && (
        <Alert severity="error">
          Failed to login:{' '}
          {loginErrors?.response?.data?.error || loginErrors.response.data?.message}
        </Alert>
      )}
    </Box>
  );
};

export default Login;
