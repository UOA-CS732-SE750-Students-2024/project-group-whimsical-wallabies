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

const FriendList = () => {
  const db = [
    {
      username: 'user1',
      profilePhoto:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      bio: 'I love dogs!',
      friendList: ['user2', 'user3', 'user4', 'user5']
    },
    {
      username: 'user2',
      profilePhoto:
        'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg',
      bio: 'Dog lover and adventurer.',
      friendList: ['user1', 'user3']
    },
    {
      username: 'user3',
      profilePhoto:
        'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg',
      bio: 'Looking for playmates for my dog.',
      friendList: ['user1', 'user2']
    },
    {
      username: 'user4',
      profilePhoto:
        'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      bio: 'Looking for playmates for my dog.',
      friendList: ['user1', 'user2']
    },
    {
      username: 'user5',
      profilePhoto:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUvo1ANKIUkgA9CBkgsKYAbPaFHfqTIKTtjsZOV0CgwA&s',
      bio: 'Looking for playmates for my dog.',
      friendList: ['user1', 'user2']
    }
  ];

  const [searchInput, setSearchInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSearch = () => {
    // Perform search using searchInput
    console.log('Searching for:', searchInput);
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
            image="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="dog photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {db[0].username}
            </Typography>
            <Typography variant="body" color="text.secondary">
              {db[0].bio}
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
          label="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
          variant="outlined"
          sx={{ mr: 1 }}
        />
        <IconButton onClick={handleSearch}>
          <ManageSearchRoundedIcon />
        </IconButton>
      </Box>

      {/* Friends list */}
      <List>
        {db[0].friendList.map((friendUsername) => {
          const friend = db.find((user) => user.username === friendUsername);
          return (
            <ListItem
              key={friendUsername}
              sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
            >
              <ListItemAvatar>
                <Avatar src={friend.profilePhoto} />
              </ListItemAvatar>
              <ListItemText primary={friend.username} secondary={friend.bio} />
              <ListItemSecondaryAction>
                <IconButton onClick={handleClickDelete(friend)}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
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
