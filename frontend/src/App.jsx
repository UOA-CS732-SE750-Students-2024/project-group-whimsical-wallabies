import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DogCreate from './components/dogcreate/DogCreate';
import DogUpdate from './components/dogupdate/DogUpdate';
import Header from './components/layout/Header';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import QueryCallExamples from './QueryCallExamples';
import theme from './theme';

import { APPLICATION_PATH } from './utils/urlRoutes';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const WelcomePage = () => {
  return <QueryCallExamples />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box className="App" sx={{ p: 3 }}>
          <AuthProvider>
            <Router>
              <>
                <Header />
                <Routes>
                  <Route path={APPLICATION_PATH.auth.login} element={<Login />} />
                  <Route path={APPLICATION_PATH.auth.signup} element={<SignUp />} />
                  <Route
                    path="/welcome"
                    element={
                      <PrivateRoute>
                        <WelcomePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path={APPLICATION_PATH.dog.create}
                    element={
                      <PrivateRoute>
                        <DogCreate />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path={APPLICATION_PATH.dog.update}
                    element={
                      <PrivateRoute>
                        <DogUpdate />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/welcome" />} />
                </Routes>
              </>
            </Router>
          </AuthProvider>
        </Box>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
