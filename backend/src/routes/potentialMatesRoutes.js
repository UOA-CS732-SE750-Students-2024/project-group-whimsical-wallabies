import express from 'express';
import { getAllOthers } from '../controllers/dogController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { DOG_POTENTIAL_MATES_PATHS } from './paths.js';

const router = express.Router();

router.get(DOG_POTENTIAL_MATES_PATHS.getAll, authenticate, getAllOthers);

export default router;
