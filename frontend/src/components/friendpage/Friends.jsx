import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Popover,
  Button,
  Grid
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGetDogs } from '../../queries/dogs';
import { useGetFriends, useUnfriendMutation } from '../../queries/friends';
import { useGetUser } from '../../queries/user';

const Friends = () => {
  const { currentUser } = useAuth();
  const { data: currentUserData, isLoading: isLoadingUser } = useGetUser(currentUser?.username);
  const { data: dogs, isLoading: isLoadingDogs } = useGetDogs();
  const { data: friendsData, isLoading: isLoadingFriends, isError } = useGetFriends();
  const { mutate: unfriend, isLoading: isLoadingUnfriend } = useUnfriendMutation();
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingDogs && dogs && dogs.length === 0) {
      console.error('No dogs available');
    }
    if (friendsData) {
      const sortedFriends = [...friendsData].sort((a, b) => a.username.localeCompare(b.username));
      setFriends(sortedFriends);
    }
  }, [isLoadingDogs, dogs, friendsData]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFriendClick = async (friend) => {
    try {
      const friendId = friend._id;
      navigate(`/friends/${friendId}`);
    } catch (error) {
      console.error('Error navigating to DogsByFriendPage:', error);
    }
  };

  const handleUnFriend = () => {
    if (selectedFriend && currentUserData) {
      unfriend(
        { currentUserId: currentUserData._id, friendId: selectedFriend._id },
        {
          onSuccess: () => {
            const updatedFriends = friends.filter((friend) => friend._id !== selectedFriend._id);
            setFriends(updatedFriends);
            handleClosePopover();
          }
        }
      );
    }
  };

  const handleClickDelete = (event, friend) => {
    setAnchorEl(event.currentTarget);
    setSelectedFriend(friend);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedFriend(null);
  };

  const filteredFriends = searchInput
    ? friends
        ?.filter((friend) => friend.username.toLowerCase().includes(searchInput.toLowerCase()))
        .sort((a, b) => a.username.localeCompare(b.username))
    : friends;

  if (isLoadingFriends || isLoadingDogs || isLoadingUser || isLoadingUnfriend)
    return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading friends.</Typography>;

  const open = Boolean(anchorEl);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          label="Search Friends..."
          value={searchInput}
          onChange={handleSearchChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <List>
          {filteredFriends.map((friend) => (
            <ListItem
              key={friend._id}
              sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
              onClick={() => handleFriendClick(friend)} // Trigger onClick
            >
              <ListItemAvatar>
                <Avatar src={friend.photoProfile || 'default_friend.jpg'} />
              </ListItemAvatar>
              <ListItemText primary={friend.username} secondary={friend.aboutMe} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleClickDelete(event, friend)}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box p={2}>
          <Typography variant="body1">
            {selectedFriend && `Are you sure to unfriend ${selectedFriend?.username}?`}
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleUnFriend} variant="contained">
              Yes
            </Button>
            <Button onClick={handleClosePopover} variant="contained">
              Cancel
            </Button>
          </Box>
        </Box>
      </Popover>
    </Grid>
  );
};

export default Friends;
