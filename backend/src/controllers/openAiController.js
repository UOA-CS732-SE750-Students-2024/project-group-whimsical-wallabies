import { askGptPlacesToWalkADog } from '../services/openAiService.js';

let cache = {}; // This prevent calling continuesly the API

export const promptQuestion = async ({ query: { lat, lon } }, res) => {
  try {
    const key = `${parseFloat(lat).toFixed(4)},${parseFloat(lon).toFixed(4)}`;
    if (!cache[key]) {
      cache[key] = await askGptPlacesToWalkADog({ lat, lon });
    }
    res.json({ answer: cache[key] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
