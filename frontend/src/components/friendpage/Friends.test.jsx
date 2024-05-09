/* eslint-disable */
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGetDogs } from '../../queries/dogs';
import { useGetFriends, useUnfriendMutation } from '../../queries/friends';
import { useGetUser } from '../../queries/user';
import Friends from './Friends';

// Mock the 'useAuth' function from the 'AuthContext' module for testing purposes.
jest.mock('../../context/AuthContext');
jest.mock('../../queries/dogs');
jest.mock('../../queries/friends');
jest.mock('../../queries/user');

// Test suite for the Friends component
describe('Friends Component', () => {
  // Render the component before each test
  beforeEach(() => {
    useAuth.mockReturnValue({ currentUser: { username: 'testUser' } });
    useGetUser.mockReturnValue({ data: { _id: 'testUserId' }, isLoading: false });
    useGetDogs.mockReturnValue({ data: [], isLoading: false });
    useGetFriends.mockReturnValue({ data: [], isLoading: false, isError: false });
    useUnfriendMutation.mockReturnValue({ mutate: jest.fn(), isLoading: false });
  });

  // Test cases for the Friends component
  test('renders the Friends component without crashing', () => {
    render(
      <MemoryRouter>
        <Friends />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Search Friends...')).toBeInTheDocument();
  });

  // Test case for searching friends
  test('displays loading message when fetching data', () => {
    useGetFriends.mockReturnValue({ data: [], isLoading: true, isError: false });
    render(
      <MemoryRouter>
        <Friends />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // test case for displaying error message
  test('displays error message when there is an error fetching data', () => {
    useGetFriends.mockReturnValue({ data: [], isLoading: false, isError: true });
    render(
      <MemoryRouter>
        <Friends />
      </MemoryRouter>
    );
    expect(screen.getByText('Error loading friends.')).toBeInTheDocument();
  });

  // test case for displaying friends list
  test('displays friends list', () => {
    useGetFriends.mockReturnValue({
      data: [
        { _id: 'friend1', username: 'friend1', aboutMe: 'About friend1' },
        { _id: 'friend2', username: 'friend2', aboutMe: 'About friend2' }
      ],
      isLoading: false,
      isError: false
    });
    render(
      <MemoryRouter>
        <Friends />
      </MemoryRouter>
    );
    expect(screen.getByText('friend1')).toBeInTheDocument();
    expect(screen.getByText('friend2')).toBeInTheDocument();
  });
});
