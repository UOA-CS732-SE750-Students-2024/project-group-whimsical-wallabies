import express from 'express';
import { promptQuestion } from '../controllers/openAiController.js';
import { getWeather } from '../controllers/weatherController.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { buildPathWithBase, THIRD_PARTY_APIS } from './paths.js';

const router = express.Router();

const externalPathBase = buildPathWithBase(THIRD_PARTY_APIS);

router.get(THIRD_PARTY_APIS.getWeather, getWeather);
router.post(
  THIRD_PARTY_APIS.promptQuestion,
  schemaValidator(externalPathBase.promptQuestion),
  promptQuestion
);

export default router;
