import { askGpt } from '../services/openAiService.js';

export const promptQuestion = async ({ body }, res) => {
  try {
    const answer = await askGpt(body);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
