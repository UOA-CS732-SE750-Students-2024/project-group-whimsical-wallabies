import jwt from 'jsonwebtoken';
import { register as registerService, login as loginService } from '../services/authService.js';

export const register = async ({ body }, res) => {
  try {
    const user = await registerService(body);
    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async ({ body }, res) => {
  try {
    const user = await loginService(body);
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Utility function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d' // token expires in 30 days
  });
};
