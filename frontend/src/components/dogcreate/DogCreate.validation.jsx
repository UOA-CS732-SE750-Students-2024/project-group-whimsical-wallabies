import Joi from 'joi';

export const dogCreateSchema = Joi.object({
  name: Joi.string().required(),
  breed: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().required(),
  weight: Joi.number().required(),
  bio: Joi.string().optional(),
  neutered: Joi.boolean().required(),
  profilePicture: Joi.string().uri().optional()
});
