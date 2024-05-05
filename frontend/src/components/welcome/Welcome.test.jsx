import { render, screen } from '@testing-library/react';
import React from 'react';
import Welcome from './Welcome';

// Mocking MUI icons and other components might be necessary if they do complex DOM manipulations or have side effects
const ExpandMoreIcon = () => <div>ExpandMoreIcon</div>;
ExpandMoreIcon.displayName = 'ExpandMoreIcon';
jest.mock('@mui/icons-material/ExpandMore', () => ExpandMoreIcon);

const PeopleIcon = () => <div>PeopleIcon</div>;
PeopleIcon.displayName = 'PeopleIcon';
jest.mock('@mui/icons-material/People', () => PeopleIcon);

const PetsIcon = () => <div>PetsIcon</div>;
PetsIcon.displayName = 'PetsIcon';
jest.mock('@mui/icons-material/Pets', () => PetsIcon);

const SearchIcon = () => <div>SearchIcon</div>;
SearchIcon.displayName = 'SearchIcon';
jest.mock('@mui/icons-material/Search', () => SearchIcon);

const WeatherComponent = () => <div>Weather Component</div>;
WeatherComponent.displayName = 'WeatherComponent';
jest.mock('../utils/Weather', () => WeatherComponent);

const DogWalkingPlacesComponent = () => <div>Dog Walking Places Component</div>;
DogWalkingPlacesComponent.displayName = 'DogWalkingPlacesComponent';
jest.mock('../utils/DogWalkingPlaces', () => DogWalkingPlacesComponent);

describe('Welcome Component', () => {
  it('renders the welcome message and key features', () => {
    render(<Welcome />);

    expect(screen.getByText('Welcome to Paw Mate!')).toBeInTheDocument();
    expect(screen.getByText('MY DOGS')).toBeInTheDocument();
    expect(screen.getByText('FRIENDS')).toBeInTheDocument();
    expect(screen.getByText('MATCHING')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Access all your dogs' information, where you can add, edit, review, or delete their details."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'View your friend list, see who has matched with you, and explore potential playdates for your pets.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Engage in matching with other users' dogs to find compatible playmates for your furry companions."
      )
    ).toBeInTheDocument();
  });

  // Test for responsive behavior
  it('renders responsive elements correctly', () => {
    window.resizeTo(500, 960); // This simulates a small screen
    render(<Welcome />);

    // Expect accordion for mobile view
    expect(screen.getByText('Weather Component')).toBeInTheDocument();
    expect(screen.getByText('Dog Walking Places Component')).toBeInTheDocument();
  });
});
