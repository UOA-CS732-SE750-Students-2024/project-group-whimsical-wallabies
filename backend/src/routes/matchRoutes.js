import express from 'express';
import { match, friends } from '../controllers/matchController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { MATCH_PATHS } from './paths.js';

const router = express.Router();

router.post(MATCH_PATHS.match, authenticate, match);
router.get(MATCH_PATHS.friends, authenticate, friends);

export default router;
