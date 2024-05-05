import { render, screen } from '@testing-library/react';
import React from 'react';
import DogDashboard from './DogDashboard';

// Mock child components
jest.mock('../dogCards', () => {
  const DogCards = () => <div>DogCardsComponent</div>;
  DogCards.displayName = 'DogCards';
  return DogCards;
});

jest.mock('../../dogs/DogCreateUpdateDialog', () => {
  const DogCreateUpdateDialog = () => <div>DogCreateUpdateDialogComponent</div>;
  DogCreateUpdateDialog.displayName = 'DogCreateUpdateDialog';
  return DogCreateUpdateDialog;
});

describe('DogDashboard', () => {
  it('renders without crashing', () => {
    render(<DogDashboard />);
    expect(screen.getByText('My Dog(s) Dashboard')).toBeInTheDocument();
    expect(screen.getByText('DogCardsComponent')).toBeInTheDocument();
    expect(screen.getByText('DogCreateUpdateDialogComponent')).toBeInTheDocument();
  });

  it('contains the correct heading', () => {
    render(<DogDashboard />);
    expect(screen.getByRole('heading', { name: /My Dog\(s\) Dashboard/i })).toBeInTheDocument();
  });
});
