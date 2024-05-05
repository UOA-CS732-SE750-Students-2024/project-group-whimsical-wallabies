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
//import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useGetFriends } from '../../queries/friends';

const FriendList = () => {
  const { data: friends, isLoading, isError } = useGetFriends();
  const [searchInput, setSearchInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  // const userId = '66376a93bd180f542a9eb6af';

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFriendDelete = (friend) => {
    // Implement friend deletion logic here
    console.log('Deleting:', friend.username);
    // Close popover
    setAnchorEl(null);
    setSelectedFriend(null);
  };

  const handleClickDelete = (friend) => (event) => {
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

  if (isLoading) return <Typography>Loading...</Typography>;
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
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jp'
            }
            alt="Profile Photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              username
            </Typography>
            <Typography variant="body2" color="text.secondary">
              userProfile?.aboutMe
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
            <ListItemText primary={friend.username} secondary={friend.bio} />
            <ListItemSecondaryAction>
              <IconButton onClick={(event) => handleClickDelete(event, friend)}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {/* Friends list */}

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
            {selectedFriend && `Are you sure to unfriend ${selectedFriend.username}?`}
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={() => handleFriendDelete(selectedFriend)} variant="contained">
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
