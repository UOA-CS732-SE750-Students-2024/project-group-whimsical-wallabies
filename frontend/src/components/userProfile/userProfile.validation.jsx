import Joi from 'joi';

export const userProfileSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  address: Joi.string().required(),
  phone: Joi.string().allow('', null).optional(),
  longitude: Joi.string().required(),
  latitude: Joi.string().required(),
  aboutMe: Joi.string().required()
});
