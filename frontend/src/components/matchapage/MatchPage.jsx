import CloseIcon from '@mui/icons-material/Close';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FemaleIcon from '@mui/icons-material/Female';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Button, Typography, IconButton } from '@mui/material';
import Hammer from 'hammerjs';
import React, { useState, useEffect, useCallback } from 'react';
import TinderCard from 'react-tinder-card';
import { useGetPotentialMates } from '../../queries/matches';
import { CommonStyles } from '../common/CommonStyles';
import Filter from './Filter';
import FriendList from './FriendList';

const MatchPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleFriendList = () => {
    setShowFriendList(!showFriendList);
  };

  const { data: potentialMates, isLoading, error, refetch } = useGetPotentialMates();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleSwipe = useCallback(
    (direction) => {
      const cardElement = document.getElementById(`card-${currentCardIndex}`);
      if (cardElement) {
        cardElement.classList.add(`swipe-${direction}`);
        setTimeout(() => {
          cardElement.classList.remove(`swipe-${direction}`);
          setCurrentCardIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            return newIndex < (potentialMates?.length || 0) ? newIndex : prevIndex;
          });
        }, 300);
      }
    },
    [currentCardIndex, potentialMates]
  );

  const handleTryAgain = () => {
    refetch();
    setCurrentCardIndex(0);
  };

  useEffect(() => {
    const cardElement = document.getElementById(`card-${currentCardIndex}`);
    if (cardElement) {
      const hammertime = new Hammer(cardElement);
      hammertime.on('pan', (event) => {
        if (event.deltaX === 0) return;
        const rotation = event.deltaX / 15;
        const scale = Math.min(1, Math.abs(event.deltaX) / 500);
        cardElement.style.transform = `translate(${event.deltaX}px, 0) rotate(${rotation}deg) scale(${scale})`;
      });
      hammertime.on('panend', (event) => {
        const isFarEnough = Math.abs(event.deltaX) > 150;
        const direction = event.deltaX > 0 ? 'right' : 'left';
        if (isFarEnough) {
          handleSwipe(direction);
        } else {
          cardElement.style.transition = 'transform 0.3s ease';
          cardElement.style.transform = '';
        }
      });

      return () => {
        hammertime.destroy();
      };
    }
  }, [currentCardIndex, handleSwipe]);
  const handleSwipeLeft = () => {
    const cardElement = document.getElementById(`card-${currentCardIndex}`);
    if (cardElement) {
      cardElement.style.transition = 'transform 0.3s ease';
      cardElement.style.transform = 'translate(-100%, 0) rotate(-10deg) scale(0.8)';
      handleSwipe('left');

      setTimeout(() => {
        cardElement.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
      }, 300);
    }
  };

  const handleSwipeRight = () => {
    const cardElement = document.getElementById(`card-${currentCardIndex}`);
    if (cardElement) {
      cardElement.style.transition = 'transform 0.3s ease';
      cardElement.style.transform = 'translate(100%, 0) rotate(10deg) scale(0.8)';
      handleSwipe('right');

      setTimeout(() => {
        cardElement.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
      }, 300);
    }
  };

  const renderGenderIcon = (gender) => {
    return gender === 'female' ? <FemaleIcon /> : <MaleIcon />;
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const monthsDiff =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth());
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    if (years === 0) {
      return `${months} months`;
    } else {
      return `${years} years ${months} months`;
    }
  };

  return (
    <Box className="dashboard" sx={CommonStyles.matchDashboard}>
      {showFilter && <Filter />}
      {showFriendList && <FriendList />}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
        <IconButton onClick={toggleFilter} color="primary">
          <FilterListRoundedIcon />
        </IconButton>
        <IconButton onClick={toggleFriendList} color="secondary">
          <Diversity1RoundedIcon />
        </IconButton>
      </Box>
      {isLoading ? (
        <Typography variant="h6">Loading potential mates...</Typography>
      ) : error ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          Error fetching potential mates: {error.message}
        </Typography>
      ) : potentialMates && potentialMates.length > 0 ? (
        <TinderCard
          key={potentialMates[currentCardIndex]?.name}
          onCardLeftScreen={() => outOfFrame(potentialMates[currentCardIndex]?.name)}
          preventSwipe={['up', 'down']}
          threshold={100}
        >
          <Box
            id={`card-${currentCardIndex}`}
            className="card"
            sx={{
              ...CommonStyles.matchCard,
              backgroundImage: `url(http://localhost:3001/${potentialMates[currentCardIndex]?.profilePicture})`
            }}
          >
            <Typography variant="h4" sx={CommonStyles.matchName}>
              {potentialMates[currentCardIndex]?.name}
              {renderGenderIcon(potentialMates[currentCardIndex]?.gender)}
            </Typography>
            <Typography variant="h6" sx={CommonStyles.matchBreed}>
              {potentialMates[currentCardIndex]?.breed}
            </Typography>
            <Typography variant="body1" sx={CommonStyles.matchInfo}>
              {potentialMates[currentCardIndex]?.weight} kg /
              {calculateAge(potentialMates[currentCardIndex]?.dob)}
            </Typography>
          </Box>
        </TinderCard>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">No potential mates found.</Typography>
          <Button variant="contained" onClick={handleTryAgain} sx={{ mt: 4 }}>
            Try Again
          </Button>
        </Box>
      )}
      <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Button variant="contained" onClick={handleSwipeLeft} sx={CommonStyles.matchButton}>
          <CloseIcon fontSize="large" />
        </Button>
        <Button variant="contained" onClick={handleSwipeRight} sx={CommonStyles.matchButton}>
          <FavoriteIcon fontSize="large" />
        </Button>
      </Box>
    </Box>
  );
};

export default MatchPage;
