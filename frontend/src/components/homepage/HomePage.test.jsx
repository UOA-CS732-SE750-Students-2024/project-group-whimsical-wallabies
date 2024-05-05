import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage Component', () => {
  beforeEach(() => {
    // Mock the documentElement style properties
    Object.defineProperty(document.documentElement, 'style', {
      writable: true,
      value: { margin: '', padding: '' }
    });

    // Mock the document.getElementById to return an object with a style property
    document.getElementById = jest.fn().mockImplementation(() => {
      return {
        style: {
          margin: '',
          padding: ''
        }
      };
    });
  });

  const renderComponent = () =>
    render(
      <Router>
        <HomePage />
      </Router>
    );

  test('renders HomePage with header and subtitles', () => {
    renderComponent();

    // Check for the main header
    const headerElement = screen.getByText('Paw Mate');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders login and signup buttons with correct navigation', () => {
    renderComponent();

    // Check for login button and its navigation link
    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.closest('a')).toHaveAttribute('href', '/login');

    // Check for signup button and its navigation link
    const signupButton = screen.getByRole('button', { name: /sign up/i });
    expect(signupButton).toBeInTheDocument();
    expect(signupButton.closest('a')).toHaveAttribute('href', '/signup');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
