import Joi from 'joi';
import { AUTH_PATHS, buildPathWithBase } from '../routes/paths.js';
const authPathBase = buildPathWithBase(AUTH_PATHS);

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

export default {
  [authPathBase.login]: loginSchema,
  [authPathBase.register]: registerSchema
};
