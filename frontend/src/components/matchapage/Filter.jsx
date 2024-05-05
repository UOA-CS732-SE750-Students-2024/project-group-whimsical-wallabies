import { Box, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import React, { useState } from 'react';

const Filter = () => {
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

  const [filters, setFilters] = useState({
    breeds: [],
    gender: [],
    age: [],
    neutered: []
  });

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value]
    }));
  };

  const handleSubmit = () => {
    console.log('Filtering with:', filters);
  };

  return (
    <>
      {open && (
        <Box
          sx={{
            width: '25%',
            height: '100vh',
            overflowY: 'auto',
            position: 'fixed',
            top: 0,
            left: 0,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            backgroundColor: 'white',
            padding: '16px'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Dog Breeds
          </Typography>
          {db.map((dog, index) => (
            <FormControlLabel
              key={index} // Assign a unique key based on the array index
              control={
                <Checkbox
                  onChange={() => handleCheckboxChange('breeds', dog.breed)}
                  checked={filters.breeds.includes(dog.breed)}
                />
              }
              label={dog.breed} // Use dog breed as the label
            />
          ))}
          <Typography variant="h6" gutterBottom mt={2}>
            Gender
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('gender', 'male')}
                checked={filters.gender.includes('male')}
              />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('gender', 'female')}
                checked={filters.gender.includes('female')}
              />
            }
            label="Female"
          />
          <Typography variant="h6" gutterBottom mt={2}>
            Age
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('age', '1yr')}
                checked={filters.age.includes('1yr')}
              />
            }
            label="1 yr"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('age', '1-3yrs')}
                checked={filters.age.includes('1-3yrs')}
              />
            }
            label="1-3 yrs"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('age', '3-7yrs')}
                checked={filters.age.includes('3-7yrs')}
              />
            }
            label="3-7 yrs"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('age', '7+yrs')}
                checked={filters.age.includes('7+yrs')}
              />
            }
            label="7+ yrs"
          />
          <Typography variant="h6" gutterBottom mt={2}>
            Neutered
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('neutered', 'yes')}
                checked={filters.neutered.includes('yes')}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('neutered', 'no')}
                checked={filters.neutered.includes('no')}
              />
            }
            label="No"
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Filter;
