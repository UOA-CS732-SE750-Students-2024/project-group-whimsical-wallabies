import { Box, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const dogBreeds = [
  'Labrador Retriever',
  'German Shepherd',
  'Golden Retriever',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Pembroke Welsh Corgi',
  'Siberian Husky',
  'Australian Shepherd',
  'Great Dane',
  'Doberman Pinscher',
  'Cavalier King Charles Spaniel',
  'Shih Tzu',
  'Miniature Schnauzer',
  'Boston Terrier',
  'Bernese Mountain Dog',
  'Havanese',
  'Shetland Sheepdog',
  'English Springer Spaniel',
  'Brittany',
  'Pug',
  'Mastiff',
  'Chihuahua',
  'Vizsla',
  'Cane Corso',
  'Border Collie',
  'Maltese',
  'Bichon Frise',
  'West Highland White Terrier',
  'Papillon',
  'Collie',
  'Weimaraner',
  'Newfoundland',
  'Basset Hound',
  'Rhodesian Ridgeback',
  'Bull Terrier',
  'Akita',
  'Standard Schnauzer',
  'Staffordshire Bull Terrier',
  'American Cocker Spaniel',
  'Whippet',
  'Belgian Malinois',
  'St. Bernard',
  'Bullmastiff',
  'Australian Cattle Dog',
  'Scottish Terrier',
  'Portuguese Water Dog',
  'Airedale Terrier',
  'Dalmatian',
  'Soft Coated Wheaten Terrier',
  'Irish Setter',
  'Chow Chow',
  'German Shorthaired Pointer',
  'Samoyed',
  'Blue Heeler',
  'Miniature American Shepherd',
  'Italian Greyhound',
  'Chinese Shar-Pei',
  'Cairn Terrier',
  'English Cocker Spaniel',
  'Bloodhound',
  'Alaskan Malamute',
  'Pekingese',
  'Basenji',
  'Bouviers des Flandres',
  'American Bulldog',
  'Fox Terrier',
  'Russian Toy',
  'Toy Fox Terrier',
  'Norwegian Elkhound',
  'Old English Sheepdog',
  'Jack Russell Terrier',
  'Pointer',
  'American Staffordshire Terrier',
  'Saluki',
  'Irish Wolfhound',
  'Afghan Hound',
  'Brittany Spaniel',
  'Field Spaniel',
  'Finnish Spitz',
  'Leonberger',
  'Neapolitan Mastiff',
  'Newfoundland and Labrador Retriever',
  'Nova Scotia Duck Tolling Retriever',
  'Anatolian Shepherd Dog',
  'Black and Tan Coonhound',
  'American Water Spaniel',
  'Australian Terrier',
  'Bedlington Terrier',
  'Belgian Tervuren',
  'Bluetick Coonhound',
  'Boykin Spaniel',
  'Bracco Italiano',
  'Briard',
  'Cesky Terrier',
  'Clumber Spaniel',
  'Curly-Coated Retriever',
  'Dandie Dinmont Terrier',
  'Flat-Coated Retriever',
  'Greyhound'
].sort();

const Filter = ({ applyFilters }) => {
  const [localFilters, setlocalFilters] = useState({
    breeds: [],
    gender: [],
    age: [],
    neutered: []
  });

  const handleCheckboxChange = (category, value) => {
    setlocalFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSubmit = () => {
    applyFilters(localFilters);
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
          {dogBreeds.map((breed, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  onChange={() => handleCheckboxChange('breeds', breed)}
                  checked={localFilters.breeds.includes(breed)}
                />
              }
              label={breed}
            />
          ))}
          <Typography variant="h6" gutterBottom mt={2}>
            Gender
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('gender', 'male')}
                checked={localFilters.gender.includes('male')}
              />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('gender', 'female')}
                checked={localFilters.gender.includes('female')}
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
                checked={localFilters.age.includes('1yr')}
              />
            }
            label="1 yr"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('age', '1-3yrs')}
                checked={localFilters.age.includes('1-3yrs')}
              />
            }
            label="1-3 yrs"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('age', '3-7yrs')}
                checked={localFilters.age.includes('3-7yrs')}
              />
            }
            label="3-7 yrs"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('age', '7+yrs')}
                checked={localFilters.age.includes('7+yrs')}
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
                checked={localFilters.neutered.includes('yes')}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleCheckboxChange('neutered', 'no')}
                checked={localFilters.neutered.includes('no')}
              />
            }
            label="No"
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Apply Filters
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

Filter.propTypes = {
  applyFilters: PropTypes.func.isRequired
};
export default Filter;
