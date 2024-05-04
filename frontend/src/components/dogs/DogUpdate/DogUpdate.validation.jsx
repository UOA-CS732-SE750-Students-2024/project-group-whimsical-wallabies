import * as yup from 'yup';

export const dogUpdateSchema = yup.object().shape({
  name: yup.string(),
  breed: yup.string(),
  dob: yup.date(),
  gender: yup.string(),
  weight: yup.number(),
  bio: yup.string(),
  neutered: yup.boolean()
});
