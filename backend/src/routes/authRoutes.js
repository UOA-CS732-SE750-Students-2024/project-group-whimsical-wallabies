import express from 'express';
import { register, login, getMyProfile } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { AUTH_PATHS, buildPathWithBase } from './paths.js';

const router = express.Router();

const authPathBase = buildPathWithBase(AUTH_PATHS);

router.post(AUTH_PATHS.register, schemaValidator(authPathBase.register), register);

router.post(AUTH_PATHS.login, schemaValidator(authPathBase.login), login);

router.get(AUTH_PATHS.profile, authenticate, getMyProfile);

export default router;
