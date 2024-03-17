import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Login from './components/login/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import { APPLICATION_PATH } from './utils/urlRoutes';

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
    <div className="App">
      <AuthProvider>
        <Router>
          <>
            <Header />
            <Routes>
              <Route path={APPLICATION_PATH.auth.login} element={<Login />} />
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
    </div>
  );
};

export default App;
