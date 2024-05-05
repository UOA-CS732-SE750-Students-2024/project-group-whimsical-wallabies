import express from 'express';
import { promptQuestion } from '../controllers/openAiController.js';
import { getWeather } from '../controllers/weatherController.js';
import { THIRD_PARTY_APIS } from './paths.js';

const router = express.Router();

router.get(THIRD_PARTY_APIS.getWeather, getWeather);
router.get(THIRD_PARTY_APIS.promptQuestion, promptQuestion);

export default router;
