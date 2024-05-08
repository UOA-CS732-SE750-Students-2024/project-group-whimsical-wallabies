import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import { Box, Typography, Grid, CircularProgress, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosApiInstance from '../../utils/axiosApiInstance';
import FriendList from '../matchapage/FriendList';
import FriendsDogCardItem from './FriendsDogCardItem';

const FriendPage = () => {
  const { friendId } = useParams();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendDogs, setFriendDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFriendList, setShowFriendList] = useState(false);

  const toggleFriendList = () => {
    setShowFriendList(!showFriendList);
  };

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const friendsResponse = await axiosApiInstance.get('/api/match');
        const friends = friendsResponse.data;

        const friend = friends.find((friend) => friend._id === friendId);

        if (friend) {
          setSelectedFriend(friend);

          const dogsResponse = await axiosApiInstance.get(`/api/dog/user/${friendId}`);
          setFriendDogs(dogsResponse.data);
        } else {
          console.error(`Friend with ID ${friendId} not found.`);
        }
      } catch (error) {
        console.error('Error fetching friend data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendData();
  }, [friendId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <IconButton onClick={toggleFriendList} color="secondary">
            <Diversity1RoundedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
      {showFriendList && <FriendList />}
      <Grid item xs={12}>
        {selectedFriend ? (
          <div>
            <Typography variant="h4" gutterBottom>
              Dogs owned by {selectedFriend.username}:
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {friendDogs.map((dog) => (
                <Grid item key={dog._id} xs={12} sm={6} md={4} lg={3}>
                  <FriendsDogCardItem
                    id={dog._id}
                    image={dog.profilePicture}
                    name={dog.name}
                    gender={dog.gender}
                    aboutMe={dog.bio}
                    userId={friendId}
                    dogId={dog._id}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <Typography variant="body1">Loading friend data...</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default FriendPage;
