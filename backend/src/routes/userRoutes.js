import express from 'express';
import { getProfile } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { USER_PATHS } from './paths.js';

const router = express.Router();

router.get(USER_PATHS.profile, authenticate, getProfile);

export default router;
