import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { AUTH_PATHS, buildPathWithBase } from './paths.js';

const router = express.Router();

const authPathBase = buildPathWithBase(AUTH_PATHS);

router.post(AUTH_PATHS.register, schemaValidator(authPathBase.register), register);

router.post(AUTH_PATHS.login, schemaValidator(authPathBase.login), login);

router.get('/', (req, res) => res.send('Hello Wallabies!'));

router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Access to protected data' });
});

export default router;
