import * as yup from 'yup';

export const dogCreateSchema = yup.object().shape({
  name: yup.string().required(),
  breed: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.string().required(),
  weight: yup.number().required(),
  bio: yup.string().optional(),
  neutered: yup.boolean().required()
});

export const dogUpdateSchema = yup.object().shape({
  name: yup.string(),
  breed: yup.string(),
  dob: yup.date(),
  gender: yup.string(),
  weight: yup.number(),
  bio: yup.string(),
  neutered: yup.boolean()
});
