import { yupResolver } from '@hookform/resolvers/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import {
  Chip,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardActions
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useCreateDogMutation,
  useGetDogById,
  useUpdateDogMutation,
  useUploadDogProfilePictureMutation
} from '../../../queries/dogs';
import { CommonStyles } from '../../common/CommonStyles';
import DogFormBase from '../DogFormBase';
import { dogCreateSchema, dogUpdateSchema } from './DogCreateUpdate.validation';

const defaultValues = {
  name: '',
  breed: '',
  dob: new Date(),
  owner: '',
  gender: '',
  weight: '',
  bio: '',
  neutered: false
};

const DogCreateUpdateDialog = ({ dogId }) => {
  const queryClient = useQueryClient();
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePicture(file);
    } else {
      setProfilePicture(null);
    }
  };

  const { control, handleSubmit, reset, setError } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver((dogId && dogUpdateSchema) || dogCreateSchema, {
      abortEarly: false,
      stripUnknown: true
    })
  });
  const [open, setOpen] = useState(false);

  const toggleAndInvalidate = () => {
    setOpen(false);
    queryClient.invalidateQueries(['me', 'dogs']);
    if (dogId) queryClient.invalidateQueries(['dogs', dogId]);
  };

  const { data: dog, isLoading } = useGetDogById(dogId, { enabled: !!dogId });
  const { mutate: mutateUploadDogProfilePicture } = useUploadDogProfilePictureMutation({
    onSuccess: () => {
      toggleAndInvalidate();
      setProfilePicture(null);
    }
  });
  const { mutate: mutateUpdateDog, error: mutateUpdateDogError } = useUpdateDogMutation(dogId, {
    onSuccess: () => {
      if (!profilePicture) return toggleAndInvalidate();
      return mutateUploadDogProfilePicture({ dogId, profilePicture });
    }
  });

  const { mutate: mutateCreateDog, error: mutateCreateDogError } = useCreateDogMutation({
    onSuccess: (newDog) => {
      if (!profilePicture) return toggleAndInvalidate();
      return mutateUploadDogProfilePicture({ dogId: newDog._id, profilePicture });
    }
  });
  const mutationError = mutateUpdateDogError || mutateCreateDogError;
  const mutationFunction = (dogId && mutateUpdateDog) || mutateCreateDog;

  useEffect(() => {
    const serverErrors = mutationError?.response?.data?.fields;
    if (serverErrors) {
      Object.keys(serverErrors).forEach((fieldName) => {
        setError(fieldName, {
          type: 'server',
          message: serverErrors[fieldName]
        });
      });
    }
  }, [mutationError, setError]);
  useEffect(() => {
    if (dog) {
      reset(dog);
    }
    return () => {
      reset(defaultValues);
    };
  }, [dog, reset]);

  if (!open) {
    return (
      <Chip
        label={dogId ? 'Update Dog' : 'Create Dog'}
        onClick={() => setOpen(true)}
        sx={CommonStyles.chipButton}
      />
    );
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
      <Box component="form" onSubmit={handleSubmit(mutationFunction)}>
        <DialogTitle>{dogId ? 'Update Dog' : 'Create Dog'}</DialogTitle>
        <DialogContent>
          <DogFormBase
            isLoading={isLoading}
            control={control}
            handleImageChange={handleImageChange}
          />
          {mutationError && <p>An error occurred: {mutationError.message}</p>}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <CardActions
            disableSpacing
            sx={{
              ...CommonStyles.cardActions,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}
            md={CommonStyles.cardActions}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={isLoading}
              sx={{ width: { xs: '100%', sm: 'auto' }, mt: 1, mx: { sm: 1 } }}
              md={CommonStyles.actionButton}
            >
              {dogId ? 'Update' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="contained"
              color="warning"
              disabled={isLoading}
              startIcon={<UndoIcon />}
              onClick={() => reset((dog && dog) || defaultValues)}
              sx={{ width: { xs: '100%', sm: 'auto' }, mt: 1, mx: { sm: 1 } }}
              md={CommonStyles.actionButton}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="success"
              startIcon={<CancelIcon />}
              onClick={() => setOpen(false)}
              sx={{ width: { xs: '100%', sm: 'auto' }, mt: 1, mx: { sm: 1 } }}
              md={CommonStyles.actionButton}
            >
              Cancel
            </Button>
          </CardActions>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

DogCreateUpdateDialog.propTypes = {
  dogId: PropTypes.string
};

export default DogCreateUpdateDialog;
