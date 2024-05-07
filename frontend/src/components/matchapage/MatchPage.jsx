import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import CloseIcon from '@mui/icons-material/Close';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FemaleIcon from '@mui/icons-material/Female';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MaleIcon from '@mui/icons-material/Male';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import PetsIcon from '@mui/icons-material/Pets';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Box, Button, Typography, Snackbar, IconButton } from '@mui/material';
import Hammer from 'hammerjs';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import ReactCardFlip from 'react-card-flip';
import TinderCard from 'react-tinder-card';
import { useLikeDogMutation } from '../../queries/friends';
import { useGetPotentialMates } from '../../queries/matches';
import { CommonStyles } from '../common/CommonStyles';
import Filter from './Filter';
import FlipCardPhoto from './FlipCardPhoto';
import FriendList from './FriendList';

const getDogAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
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

const filterDogs = (dogs, { breeds, gender, age, neutered }) => {
  return dogs.filter((dog) => {
    const ageInYears = getDogAge(dog.dob);
    return (
      (breeds.length === 0 || breeds.includes(dog.breed)) &&
      ((gender === 'all' && true) || gender === dog.gender) &&
      ((neutered === 'all' && true) || neutered === dog.neutered.toString()) &&
      (age.min <= ageInYears || age.max >= ageInYears)
    );
  });
};

const MatchPage = () => {
  const { mutate: likeDog } = useLikeDogMutation();
  const [filters, setFilters] = useState({
    manualMatch: false,
    breeds: [],
    gender: 'all',
    age: {
      min: 0,
      max: 100
    },
    neutered: 'all'
  });
  const {
    data: potentialMates,
    isLoading,
    error,
    refetch
  } = useGetPotentialMates(filters.manualMatch);
  const [shuffledMates, setShuffledMates] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showLastCardMessage, setShowLastCardMessage] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleFriendList = () => {
    setShowFriendList(!showFriendList);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    console.log('flip');
  };

  useEffect(() => {
    if (potentialMates && potentialMates.length > 0) {
      const shuffledArray = shuffleArray(filterDogs(potentialMates, filters));
      setShuffledMates(shuffledArray);
      setCurrentCardIndex(0);
    } else {
      setShuffledMates([]);
      setCurrentCardIndex(0);
    }
  }, [filters, potentialMates]);

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
    likeDog(shuffledMates[currentCardIndex]?._id);
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
    return gender === 'Female' ? <FemaleIcon /> : <MaleIcon />;
  };

  const outOfFrame = (name, direction) => {
    if (direction === 'right') {
      likeDog(shuffledMates[currentCardIndex]?._id);
    }
  };

  const simplyDob = (dob) => {
    const birthDate = new Date(dob);
    const year = birthDate.getFullYear();
    const month = ('0' + (birthDate.getMonth() + 1)).slice(-2);
    const day = ('0' + birthDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  };

  const getNeuteredStatus = (neutered) => {
    return neutered ? 'Yes' : 'No';
  };

  const MatchInfoLine = ({ icon: Icon, label, value }) => (
    <Typography
      variant="h4"
      sx={{
        ...CommonStyles.matchNameBack,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '300px'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon />
        <span style={{ fontWeight: 'normal', marginLeft: '20px' }}>{label}</span>:
      </Box>
      <Box ml={1} fontWeight="bold" flex="1">
        {value}
      </Box>
    </Typography>
  );

  return (
    <Box>
      <IconButton onClick={toggleFilter} color="primary">
        <FilterListRoundedIcon />
      </IconButton>
      <IconButton onClick={toggleFriendList} color="secondary">
        <Diversity1RoundedIcon />
      </IconButton>
      <Box className="dashboard" sx={CommonStyles.matchDashboard}>
        {showFilter && (
          <Filter setIsManualMatch={filters.manualMatch} setTinderFilters={setFilters} />
        )}
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
            onCardLeftScreen={(direction) =>
              outOfFrame(shuffledMates[currentCardIndex]?.name, direction)
            }
            preventSwipe={['up', 'down']}
            threshold={100}
            sx={{
              width: { xs: '100%', sm: '50%', md: '25%' },
              padding: { xs: 1, sm: 2, md: 3 },
              overflow: 'hidden',
              maxHeight: '80vh'
            }}
          >
            <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
              <Box
                id={`card-${currentCardIndex}`}
                className="card"
                sx={{
                  ...CommonStyles.matchCardFront,
                  backgroundImage: `url(${process.env.REACT_APP_API_URL}/${shuffledMates[currentCardIndex]?.profilePicture})`
                }}
                onClick={flipCard}
              >
                <Typography variant="h4" sx={CommonStyles.matchName}>
                  {shuffledMates[currentCardIndex]?.name}
                  {renderGenderIcon(shuffledMates[currentCardIndex]?.gender)}
                </Typography>
                <Typography variant="h6" sx={CommonStyles.matchBreed}>
                  {shuffledMates[currentCardIndex]?.breed}
                </Typography>
                <Typography variant="body1" sx={CommonStyles.matchInfo}>
                  {shuffledMates[currentCardIndex]?.weight} kg |{' '}
                  {calculateAge(shuffledMates[currentCardIndex]?.dob)}
                </Typography>
              </Box>
              <Box
                id={`card-${currentCardIndex}`}
                className="card"
                sx={{
                  ...CommonStyles.matchCardBack
                }}
                onClick={flipCard}
              >
                <MatchInfoLine
                  icon={AutoAwesomeIcon}
                  label="Name"
                  value={shuffledMates[currentCardIndex]?.name}
                />
                <MatchInfoLine
                  icon={PetsIcon}
                  label="Breed"
                  value={shuffledMates[currentCardIndex]?.breed}
                />
                <MatchInfoLine
                  icon={MonitorWeightIcon}
                  label="Weight"
                  value={`${shuffledMates[currentCardIndex]?.weight} kg`}
                />
                <MatchInfoLine
                  icon={BadgeIcon}
                  label="Age"
                  value={calculateAge(shuffledMates[currentCardIndex]?.dob)}
                />
                <MatchInfoLine
                  icon={CakeIcon}
                  label="Birthday"
                  value={simplyDob(shuffledMates[currentCardIndex]?.dob)}
                />
                <MatchInfoLine
                  icon={FavoriteBorderIcon}
                  label="Neutered"
                  value={getNeuteredStatus(shuffledMates[currentCardIndex]?.neutered)}
                />
                <MatchInfoLine
                  icon={LocationOnIcon}
                  label="Distance"
                  value={`${shuffledMates[currentCardIndex]?.distance} km`}
                />
                <Typography variant="h4" sx={CommonStyles.matchBio}>
                  <SentimentSatisfiedAltIcon />
                  <span> </span>
                  <span style={{ fontWeight: 'normal' }}>About Me: </span>
                  <br />
                  {shuffledMates[currentCardIndex]?.bio}
                </Typography>
                <FlipCardPhoto id={shuffledMates[currentCardIndex]?._id} />
              </Box>
            </ReactCardFlip>
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
                padding: '10px 20px',
                minWidth: '120px'
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
                padding: '10px 20px',
                minWidth: '120px'
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

MatchPage.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default MatchPage;
