import {
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
                  <TextField
                    {...field}
                    label="Breed"
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

DogFormBase.propTypes = {
  handleImageChange: PropTypes.func.isRequired,
  control: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default DogFormBase;
