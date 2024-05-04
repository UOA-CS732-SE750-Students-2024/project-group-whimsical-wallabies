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
