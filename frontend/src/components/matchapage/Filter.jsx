import {
  Box,
  FormControlLabel,
  Button,
  Autocomplete,
  TextField,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
  Divider
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { dogBreeds } from '../../data/dogBreeds';

const filterInitialState = {
  manualMatch: false,
  breeds: [],
  gender: 'all',
  age: {
    min: 0,
    max: 100
  },
  neutered: 'all'
};

const Filter = ({ setTinderFilters }) => {
  const [filters, setFilters] = useState(filterInitialState);
  const handleChange = (prop) => (event) => {
    setFilters({ ...filters, age: { ...filters.age, [prop]: event.target.value } });
  };

  const handleSubmit = () => {
    setTinderFilters(filters, { manualMatch: true });
  };
  const handleAutoMatch = () => {
    setFilters({ ...filterInitialState, manualMatch: false });
    setTinderFilters(filters);
  };
  const handleManualMatch = () => {
    setFilters({ ...filterInitialState, manualMatch: true });
    setTinderFilters(filters);
  };

  const handleRadioChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
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
          <Typography variant="h5">
            {(filters.manualMatch && 'Manual Match') || 'Auto Match'}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {filters.manualMatch ? (
              <Typography variant="body1">
                Prefer a more hands-on approach? Select Manual Match to personally filter and select
                potential mates based on specific criteria that you value. This option gives you the
                flexibility to fine-tune the search based on your preferences.
              </Typography>
            ) : (
              <Typography variant="body1">
                Our system automatically finds potential mates whose profiles closely align with
                your dog’s characteristics. This option is designed for effortless matches, ensuring
                compatibility based on our comprehensive profile analysis.
              </Typography>
            )}
          </Typography>
          {filters.manualMatch && (
            <>
              <Box>
                <FormControl fullWidth>
                  <FormLabel>Dog Breeds</FormLabel>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={dogBreeds}
                    onChange={(_, breeds) => setFilters({ ...filters, breeds })}
                    filterSelectedOptions
                    value={filters.breeds}
                    renderInput={(params) => (
                      <TextField {...params} label="Filter Breeds" placeholder="Breeds" />
                    )}
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => {
                        const { key, ...restProps } = getTagProps({ index });
                        return <Chip {...restProps} key={option + '-' + key} label={option} />;
                      });
                    }}
                  />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={filters.gender}
                    onChange={(event) => handleRadioChange('gender', event.target.value)}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <TextField
                      label="Min Age"
                      variant="outlined"
                      type="number"
                      value={filters.age.min}
                      onChange={handleChange('min')}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Optional: enhances mobile usability
                    />
                    <TextField
                      label="Max Age"
                      variant="outlined"
                      type="number"
                      value={filters.age.max}
                      onChange={handleChange('max')}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Optional: enhances mobile usability
                    />
                  </Box>
                </FormControl>
              </Box>
              <Divider />
              <FormControl>
                <FormLabel>Neutered</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={filters.neutered}
                  onChange={(event) => handleRadioChange('neutered', event.target.value)}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                  <FormControlLabel value="all" control={<Radio />} label="All" />
                </RadioGroup>
              </FormControl>
              <Divider />
            </>
          )}
          <Box
            mt={2}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {filters.manualMatch && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={filters === filterInitialState}
              >
                Filter
              </Button>
            )}
            {!filters.manualMatch && (
              <Button variant="contained" color="primary" onClick={handleManualMatch}>
                Manual Match
              </Button>
            )}
            {filters.manualMatch && (
              <Button variant="contained" color="primary" onClick={handleAutoMatch}>
                Auto Match
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

Filter.propTypes = {
  setTinderFilters: PropTypes.func.isRequired
};

export default Filter;
