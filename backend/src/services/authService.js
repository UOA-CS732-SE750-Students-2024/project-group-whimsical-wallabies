import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async ({
  username,
  password,
  email,
  address,
  latitude,
  longitude,
  phone
}) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hashedPassword,
    email,
    address,
    latitude,
    longitude,
    phone
  });
  await user.save();

  return user;
};

export const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return user;
};
