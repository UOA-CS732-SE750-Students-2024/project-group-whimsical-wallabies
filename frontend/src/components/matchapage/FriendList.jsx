import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
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
  CardActionArea
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGetDogs } from '../../queries/dogs';
import { useGetFriends, useUnfriendMutation } from '../../queries/friends';
import { useGetUser } from '../../queries/user.js';

const FriendList = () => {
  const { currentUser } = useAuth();
  const { data: currentUserData, isLoading: isLoadingUser } = useGetUser(currentUser?.username);
  const { data: dogs, isLoading: isLoadingDogs } = useGetDogs();
  const { data: friends, isLoading: isLoadingFriends, isError } = useGetFriends();
  const [searchInput, setSearchInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const randomDog = dogs ? dogs[Math.floor(Math.random() * dogs.length)] : null;

  useEffect(() => {
    if (!isLoadingDogs && dogs && dogs.length === 0) {
      console.error('No dogs available');
    }
  }, [isLoadingDogs, dogs]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
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
    ? friends?.filter((friend) => friend.username.toLowerCase().includes(searchInput.toLowerCase()))
    : friends;

  if (isLoadingFriends || isLoadingDogs || isLoadingUser || isLoadingUnfriend)
    return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading friends.</Typography>;

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        width: '25%',
        height: '100vh',
        overflowY: 'auto',
        position: 'fixed',
        top: 0,
        right: 0,
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: 'white'
      }}
    >
      {/* Name card */}
      <Card>
        <CardActionArea component={Link} to="/profile">
          <CardMedia
            component="img"
            height="300"
            image={`${process.env.REACT_APP_API_URL}/${randomDog.profilePicture}`}
            alt="Dog Photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {currentUserData?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUserData?.aboutMe}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Search */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2
        }}
      >
        <TextField
          fullWidth
          label="Search Friends..."
          value={searchInput}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{ m: 2 }}
        />
        <IconButton onClick={handleSearchChange}>
          <ManageSearchRoundedIcon />
        </IconButton>
      </Box>

      {/* Friends list */}
      <List>
        {filteredFriends.map((friend) => (
          <ListItem key={friend._id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
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

      {/* Popover */}
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
    </Box>
  );
};

export default FriendList;
