import { fetchWeatherByLocation } from '../services/weatherService.js';

export const getWeather = async (req, res) => {
  const { lat, lon } = req.query; // Expect latitude and longitude as query parameters
  if (!lat || !lon) {
    return res.status(400).json({
      message: 'Please provide both latitude (lat) and longitude (lon) query parameters.'
    });
  }

  try {
    const weather = await fetchWeatherByLocation(lat, lon);
    // Determine if it's a good day for a walk
    // Criteria: No rain, comfortable temperature (e.g., between 15°C and 25°C), no extreme weather conditions
    const isGoodDayForWalk =
      !weather.weather.some((condition) => ['Rain', 'Snow', 'Extreme'].includes(condition.main)) &&
      weather.main.temp >= 15 && // Assuming temperature is in °C and you're fetching weather with units=metric
      weather.main.temp <= 25;

    res.json({ ...weather, isGoodDayForWalk });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
