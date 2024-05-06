import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { USER_PATHS } from './paths.js';

const router = express.Router();

router.get(USER_PATHS.getUser, authenticate, getUser);
router.put(USER_PATHS.updateUser, authenticate, updateUser);

export default router;
