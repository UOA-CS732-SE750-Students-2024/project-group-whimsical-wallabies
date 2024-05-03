import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';
import { useAuth } from '../../context/AuthContext';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('SignUp Component', () => {
  let mockSignup;
  beforeEach(() => {
    mockSignup = jest.fn(() => Promise.resolve());
    useAuth.mockImplementation(() => ({
      signup: mockSignup,
      signupErrors: null,
      isPendingSignup: false,
      isSignup: false,
      setIsSignup: jest.fn()
    }));
  });

  const setup = () => render(<SignUp />, { wrapper: BrowserRouter });

  it('should render the signup form with all fields', () => {
    setup();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/longitude/i)).toBeInTheDocument();
  });

  it('should allow entering text in the input fields', () => {
    setup();
    const usernameInput = screen.getByLabelText(/username/i);
    userEvent.type(usernameInput, 'testuser');
    expect(usernameInput.value).toBe('testuser');

    const emailInput = screen.getByLabelText(/email address/i);
    userEvent.type(emailInput, 'test@example.com');
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should display error message when form is submitted with empty required fields', async () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/is not allowed to be empty/i);
      errorMessages.forEach((message) => {
        expect(message).toBeInTheDocument();
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
