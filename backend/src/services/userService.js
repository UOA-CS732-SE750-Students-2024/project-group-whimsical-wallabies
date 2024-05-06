import User from '../models/User.js';

export const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');
  return user;
};

export const updateUserByUsername = async (username, userdata) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');
  user.email = userdata.email;
  user.address = userdata.address;
  user.phone = userdata.phone;
  user.latitude = Number(userdata.latitude);
  user.longitude = Number(userdata.longitude);
  user.aboutMe = userdata.aboutMe;
  console.log(userdata);
  user.save();
  return user;
};
