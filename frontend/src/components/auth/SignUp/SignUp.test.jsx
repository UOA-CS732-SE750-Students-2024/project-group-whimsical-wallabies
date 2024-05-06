import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './SignUp';

// Mock necessary imports
jest.mock('../../../context/AuthContext', () => ({
  useAuth: () => ({
    signup: jest.fn(),
    signupErrors: null,
    isPendingSignup: false,
    isSignup: true,
    setIsSignup: jest.fn()
  }),
  useNavigate: () => jest.fn()
}));

describe('SignUp Component', () => {
  const setup = () =>
    render(
      <Router>
        <SignUp />
      </Router>
    );

  test('renders the SignUp form with all fields', () => {
    setup();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('About Me')).toBeInTheDocument();
  });

  test('shows error messages for invalid input', async () => {
    const { getByLabelText } = setup();
    fireEvent.submit(getByLabelText('Username'));

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/is not allowed to be empty/i);
      errorMessages.forEach((message) => {
        expect(message).toBeInTheDocument();
      });
    });
  });
});
