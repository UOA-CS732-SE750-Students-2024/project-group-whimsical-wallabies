import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { useAuth } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Setup initial state and mocks for each test
    useAuth.mockImplementation(() => ({
      login: jest.fn(),
      loginErrors: null,
      isAuthenticated: false,
      isPendingLogin: false
    }));
  });

  it('renders the login form with required fields', () => {
    render(<Login />, { wrapper: BrowserRouter });

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /Register/i })).toBeEnabled();
  });

  it('calls login function with the username and password when form is submitted', async () => {
    const mockLogin = jest.fn();
    useAuth.mockImplementation(() => ({
      login: mockLogin,
      loginErrors: null,
      isAuthenticated: false,
      isPendingLogin: false
    }));

    render(<Login />, { wrapper: BrowserRouter });
    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  it('navigates to the home page when the user is authenticated', () => {
    useAuth.mockImplementation(() => ({
      login: jest.fn(),
      loginErrors: null,
      isAuthenticated: true,
      isPendingLogin: false
    }));

    render(<Login />, { wrapper: BrowserRouter });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays error message if login fails', () => {
    const errorMessage = 'Invalid credentials';
    useAuth.mockImplementation(() => ({
      login: jest.fn(),
      loginErrors: { response: { data: { message: errorMessage } } },
      isAuthenticated: false,
      isPendingLogin: false
    }));

    render(<Login />, { wrapper: BrowserRouter });
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByText(/Failed to login/i)).toBeInTheDocument();
  });
});
