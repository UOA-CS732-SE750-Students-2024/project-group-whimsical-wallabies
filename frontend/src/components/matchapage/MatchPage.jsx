import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Button, Typography } from '@mui/material';
import Hammer from 'hammerjs';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import TinderCard from 'react-tinder-card';
import { CommonStyles } from '../common/CommonStyles';

const MatchPage = () => {
  const db = [
    {
      name: 'Cyrus',
      url: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      breed: 'Golden Retriever',
      weight: '5',
      dob: '2023-12-11T00:00:00.000Z',
      gender: 'female'
    },
    {
      name: 'Maddie',
      url: 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg',
      breed: 'German Shepherd',
      weight: '30',
      dob: '2015-06-15T00:00:00.000Z',
      gender: 'female'
    },
    {
      name: 'Leo',
      url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg',
      breed: 'Bichon',
      weight: '15',
      dob: '2019-03-18T00:00:00.000Z',
      gender: 'male'
    },
    {
      name: 'Daniel',
      url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      breed: 'Shiba Inu',
      weight: '20',
      dob: '2018-07-20T00:00:00.000Z',
      gender: 'male'
    },
    {
      name: 'Dobby',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUvo1ANKIUkgA9CBkgsKYAbPaFHfqTIKTtjsZOV0CgwA&s',
      breed: 'Great Dane',
      weight: '40',
      dob: '2015-02-23T00:00:00.000Z',
      gender: 'male'
    }
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const tinderCardRef = useRef(null);

  const handleSwipe = useCallback(
    (direction) => {
      const cardElement = document.getElementById(`card-${currentCardIndex}`);
      if (cardElement) {
        cardElement.classList.add(`swipe-${direction}`);
        setTimeout(() => {
          cardElement.classList.remove(`swipe-${direction}`);
          setCurrentCardIndex((prevIndex) => prevIndex + 1);
        }, 300);
      }
    },
    [currentCardIndex]
  );

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
    }
  }, [currentCardIndex, handleSwipe]);

  const handleSwipeLeft = () => {
    const cardElement = document.getElementById(`card-${currentCardIndex}`);
    if (cardElement) {
      cardElement.style.transition = 'transform 0.3s ease';
      cardElement.style.transform = 'translate(-100%, 0) rotate(-10deg) scale(0.8)';
      handleSwipe('left');
    }
  };

  const handleSwipeRight = () => {
    const cardElement = document.getElementById(`card-${currentCardIndex}`);
    if (cardElement) {
      cardElement.style.transition = 'transform 0.3s ease';
      cardElement.style.transform = 'translate(100%, 0) rotate(10deg) scale(0.8)';
      handleSwipe('right');
    }
  };

  const handleTryAgain = () => {
    window.location.reload();
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
      return `${months} mos`;
    } else {
      return `${years} yrs ${months} mos`;
    }
  };

  const renderGenderIcon = (gender) => {
    return gender === 'female' ? <FemaleIcon /> : <MaleIcon />;
  };

  return (
    <Box className="dashboard" sx={CommonStyles.matchDashboard}>
      <Box className="swipe-container" sx={CommonStyles.matchSwipeContainer}>
        {currentCardIndex < db.length ? (
          <TinderCard
            ref={tinderCardRef}
            key={db[currentCardIndex].name}
            onCardLeftScreen={() => outOfFrame(db[currentCardIndex].name)}
            preventSwipe={['up', 'down']}
            threshold={100}
          >
            <Box
              id={`card-${currentCardIndex}`}
              className="card"
              sx={{
                ...CommonStyles.matchCard,
                backgroundImage: `url(${db[currentCardIndex].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <Typography variant="h5" sx={CommonStyles.matchName}>
                {db[currentCardIndex].name}
                {renderGenderIcon(db[currentCardIndex].gender)}
              </Typography>
              <Typography variant="h5" sx={CommonStyles.matchBreed}>
                {db[currentCardIndex].breed}
              </Typography>
              <Typography variant="h5" sx={CommonStyles.matchInfo}>
                {db[currentCardIndex].weight}kg / {calculateAge(db[currentCardIndex].dob)}
              </Typography>
            </Box>
          </TinderCard>
        ) : (
          <>
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
              Seems like no other users match your criteria at the moment.
            </Typography>
            <Button
              variant="contained"
              onClick={handleTryAgain}
              sx={{ marginTop: '20px', backgroundColor: '#aad5dc', color: 'white' }}
            >
              <ReplayIcon /> Try Again
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ marginTop: '5px', display: 'flex', gap: '20px' }}>
        <Button variant="contained" onClick={handleSwipeLeft} sx={CommonStyles.matchLeftButton}>
          <CloseIcon fontSize="large" />
        </Button>
        <Button variant="contained" onClick={handleSwipeRight} sx={CommonStyles.matchRightButton}>
          <FavoriteIcon fontSize="large" />
        </Button>
      </Box>
    </Box>
  );
};

export default MatchPage;
