import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  confirmpassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match'
  }),
  email: Joi.string().email({ tlds: false }).required(),
  address: Joi.string().required(),
  latitude: Joi.number().precision(8).required(),
  longitude: Joi.number().precision(8).required(),
  phone: Joi.string().allow('', null).optional()
});
