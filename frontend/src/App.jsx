import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddDog from './components/dogAdd/dogAdd';
// import DogProfile from './components/dogProfile/DogProfile';
import DogDashboard from './components/dogDashboard/DogDashboard';
import Header from './components/layout/Header';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';

import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
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
  return <div>Welcome to the app!</div>;
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
                  <Route path={APPLICATION_PATH.dog.dogDashboard} element={<DogDashboard />} />
                  <Route path={APPLICATION_PATH.dog.add} element={<AddDog />} />
                  {/* <Route path={APPLICATION_PATH.dog.profile>} element={<DogProfile />} /> */}
                  <Route
                    path="/welcome"
                    element={
                      <PrivateRoute>
                        <WelcomePage />
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
