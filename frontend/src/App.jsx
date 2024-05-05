import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DogDashboard from './components/dashboard/dogDashboard';
import DogProfile from './components/dogprofile/DogProfile';

import HomePage from './components/homepage/HomePage';
import Header from './components/layout/Header';
import Login from './components/login/Login';
import MatchPage from './components/matchapage/MatchPage';
import SignUp from './components/signup/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import theme from './theme';

import { APPLICATION_PATH } from './utils/urlRoutes';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <Header />
      <Box sx={{ p: 3 }}>{children}</Box>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box className="App">
          <AuthProvider>
            <Router>
              <Routes>
                <Route path={APPLICATION_PATH.auth.login} element={<Login />} />
                <Route path={APPLICATION_PATH.auth.signup} element={<SignUp />} />
                <Route
                  path={APPLICATION_PATH.matching}
                  element={
                    <PrivateRoute>
                      <MatchPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.dashboard}
                  element={<PrivateRoute>Welcome to the Dashboard</PrivateRoute>}
                />
                <Route
                  path={APPLICATION_PATH.dog.dashboard}
                  element={
                    <PrivateRoute>
                      <DogDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.dog.profile}
                  element={
                    <PrivateRoute>
                      <DogProfile />
                    </PrivateRoute>
                  }
                />
                <Route path={APPLICATION_PATH.homepage} element={<HomePage />} />
              </Routes>
            </Router>
          </AuthProvider>
        </Box>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
