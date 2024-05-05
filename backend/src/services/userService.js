import User from '../models/User.js';

export const getUserProfile = async (userId, selfProfile) => {
  if (selfProfile) {
    return await User.findById(userId).select('-password');
  }
  return await User.findById(userId).select('-password -address -latitude -longitude');
};
