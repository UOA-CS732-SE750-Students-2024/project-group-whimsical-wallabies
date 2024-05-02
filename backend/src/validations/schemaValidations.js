import Joi from 'joi';
import { AUTH_PATHS, buildPathWithBase, THIRD_PARTY_APIS } from '../routes/paths.js';
const authPathBase = buildPathWithBase(AUTH_PATHS);
const thridPartyPathBase = buildPathWithBase(THIRD_PARTY_APIS);

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  confirmpassword: Joi.any().valid(Joi.ref('password')).required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  latitude: Joi.number().precision(8).required(),
  longitude: Joi.number().precision(8).required(),
  phone: Joi.string().allow('', null).optional()
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

const promptSchema = Joi.object({
  question: Joi.string().required()
});

export default {
  [authPathBase.login]: loginSchema,
  [authPathBase.register]: registerSchema,
  [thridPartyPathBase.promptQuestion]: promptSchema
};
