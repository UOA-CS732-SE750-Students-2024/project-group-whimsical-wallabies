// DogFormBase component, is used in DogCreateUpdateDialog component. To display the form fields for creating and updating a dog.
import {
  Autocomplete,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  MenuItem
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { CommonStyles } from '../../common/CommonStyles';

// Dog breeds list
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

// Dog form base component for dog form fields
const DogFormBase = ({ control, isLoading, handleImageChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    disabled={isLoading}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="dob"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Date of Birth"
                  views={['year', 'month', 'day']}
                  openTo="year"
                  value={field?.value ? dayjs(field.value) : null}
                  onChange={field.onChange}
                  disabled={isLoading}
                  slotProps={{ textField: { fullWidth: true } }}
                  sx={CommonStyles.autoCompleteBox}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="breed"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Autocomplete
                    {...field}
                    style={{ paddingTop: '15px' }}
                    options={dogBreeds}
                    onChange={(_, data) => field.onChange(data)}
                    renderInput={(params) => (
                      <TextField
                        label="Breed"
                        fullWidth
                        error={!!error}
                        disabled={isLoading}
                        {...params}
                      />
                    )}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    select
                    label="Gender"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    disabled={isLoading}
                    SelectProps={{ sx: { textAlign: 'left' } }}
                  >
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                  </TextField>
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="weight"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="Weight"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    disabled={isLoading}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="neutered"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox {...field} checked={field.value} onChange={field.onChange} />
                    }
                    label="Neutered"
                    disabled={isLoading}
                    sx={{ marginLeft: 0 }}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="bio"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="Bio"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    error={!!error}
                    disabled={isLoading}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="file"
              accept="image/*"
              name="profilePicture"
              label="Upload Dog Photo"
              onChange={handleImageChange}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={isLoading}
            />
          </Grid>
        </Grid>
      </>
    </LocalizationProvider>
  );
};

// Define prop types
DogFormBase.propTypes = {
  handleImageChange: PropTypes.func.isRequired,
  control: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default DogFormBase;
