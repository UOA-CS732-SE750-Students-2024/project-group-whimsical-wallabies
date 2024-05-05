import CloseIcon from '@mui/icons-material/Close';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FemaleIcon from '@mui/icons-material/Female';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Button, Typography, Snackbar, IconButton } from '@mui/material';
import Hammer from 'hammerjs';
import React, { useState, useEffect, useCallback } from 'react';
import TinderCard from 'react-tinder-card';
import { useGetPotentialMates } from '../../queries/matches';
import { CommonStyles } from '../common/CommonStyles';
import Filter from './Filter';
import FriendList from './FriendList';

const MatchPage = () => {
  const { data: potentialMates, isLoading, error, refetch } = useGetPotentialMates();
  const [shuffledMates, setShuffledMates] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showLastCardMessage, setShowLastCardMessage] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleFriendList = () => {
    setShowFriendList(!showFriendList);
  };

  useEffect(() => {
    if (potentialMates && potentialMates.length > 0) {
      const shuffledArray = shuffleArray(potentialMates);
      setShuffledMates(shuffledArray);
      setCurrentCardIndex(0);
    } else {
      setShuffledMates([]);
      setCurrentCardIndex(0);
    }
  }, [potentialMates]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleSwipe = useCallback(
    (direction) => {
      if (shuffledMates && shuffledMates.length > 0) {
        const nextIndex = currentCardIndex + 1;
        const cardElement = document.getElementById(`card-${currentCardIndex}`);

        if (cardElement) {
          const rotation = direction === 'right' ? 10 : -10;
          const opacity = direction === 'right' ? 0 : 1;

          cardElement.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
          cardElement.style.transform = `translate(${direction === 'right' ? '100%' : '-100%'}, 0) rotate(${rotation}deg)`;
          cardElement.style.opacity = opacity;

          setTimeout(() => {
            if (nextIndex >= shuffledMates.length) {
              setShowLastCardMessage(true);
            } else {
              setCurrentCardIndex(nextIndex);
            }
          }, 300);
        }
      }
    },
    [currentCardIndex, shuffledMates]
  );

  const handleTryAgain = () => {
    refetch();
  };

  const handleCloseMessage = () => {
    setShowLastCardMessage(false);
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
    if (currentCardIndex < shuffledMates.length - 1) {
      const cardElement = document.getElementById(`card-${currentCardIndex}`);
      if (cardElement) {
        cardElement.style.transition = 'transform 0.3s ease';
        cardElement.style.transform = 'translate(-100%, 0) rotate(-10deg) scale(0.8)';
        handleSwipe('left');

        setTimeout(() => {
          cardElement.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        }, 300);
      }
    }
  };

  const handleSwipeRight = () => {
    if (currentCardIndex < shuffledMates.length - 1) {
      const cardElement = document.getElementById(`card-${currentCardIndex}`);
      if (cardElement) {
        cardElement.style.transition = 'transform 0.3s ease';
        cardElement.style.transform = 'translate(100%, 0) rotate(10deg) scale(0.8)';
        handleSwipe('right');

        setTimeout(() => {
          cardElement.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        }, 300);
      }
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
    <Box>
      <IconButton onClick={toggleFilter} color="primary">
        <FilterListRoundedIcon />
      </IconButton>
      <IconButton onClick={toggleFriendList} color="secondary">
        <Diversity1RoundedIcon />
      </IconButton>
      <Box className="dashboard" sx={CommonStyles.matchDashboard}>
        {showFilter && <Filter />}
        {showFriendList && <FriendList />}

        {isLoading ? (
          <Typography variant="h6">Loading potential mates...</Typography>
        ) : error ? (
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
            Error fetching potential mates: {error.message}
          </Typography>
        ) : shuffledMates && shuffledMates.length > 0 ? (
          <TinderCard
            key={shuffledMates[currentCardIndex]?.name}
            onCardLeftScreen={() => outOfFrame(shuffledMates[currentCardIndex]?.name)}
            preventSwipe={['up', 'down']}
            threshold={100}
            sx={{
              ...CommonStyles.matchCard,
              backgroundImage: `url(http://localhost:3001/${shuffledMates[currentCardIndex]?.profilePicture})`,
              width: { xs: '100%', sm: '50%', md: '25%' },
              padding: { xs: 1, sm: 2, md: 3 }
            }}
          >
            <Box
              id={`card-${currentCardIndex}`}
              className="card"
              sx={{
                ...CommonStyles.matchCard,
                backgroundImage: `url(http://localhost:3001/${shuffledMates[currentCardIndex]?.profilePicture})`
              }}
            >
              <Typography variant="h4" sx={CommonStyles.matchName}>
                {shuffledMates[currentCardIndex]?.name}
                {renderGenderIcon(shuffledMates[currentCardIndex]?.gender)}
              </Typography>
              <Typography variant="h6" sx={CommonStyles.matchBreed}>
                {shuffledMates[currentCardIndex]?.breed}
              </Typography>
              <Typography variant="body1" sx={CommonStyles.matchInfo}>
                {shuffledMates[currentCardIndex]?.weight} kg |
                {calculateAge(shuffledMates[currentCardIndex]?.dob)}
              </Typography>
            </Box>
          </TinderCard>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6">No potential mates found.</Typography>
            <Button variant="contained" onClick={handleTryAgain} sx={{ mt: 4 }}>
              Try Again
            </Button>
          </Box>
        )}

        <Snackbar
          open={showLastCardMessage}
          autoHideDuration={3000}
          onClose={handleCloseMessage}
          message="No more cards available. You've reached the end."
        />

        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button
            variant="contained"
            onClick={handleSwipeLeft}
            sx={{
              ...CommonStyles.matchButton,
              '@media (max-width: 768px)': {
                padding: '10px 20px', // Adjust padding for smaller screens
                minWidth: '120px' // Adjust button width for smaller screens
              }
            }}
          >
            <CloseIcon fontSize="large" />
          </Button>
          <Button
            variant="contained"
            onClick={handleSwipeRight}
            sx={{
              ...CommonStyles.matchButton,
              '@media (max-width: 768px)': {
                padding: '10px 20px', // Adjust padding for smaller screens
                minWidth: '120px' // Adjust button width for smaller screens
              }
            }}
          >
            <FavoriteIcon fontSize="large" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchPage;
