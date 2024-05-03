import Dog from '../models/Dog.js';
import User from '../models/User.js';

export const createDog = async (owner, { name, breed, dob, gender, weight, neutered }) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  const dog = new Dog({ name, breed, dob, owner, gender, weight, neutered });
  await dog.save();

  return dog;
};

export const getDogs = async (owner) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  return await Dog.find({ owner });
};

export const getDog = async (id, owner) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  const dog = await Dog.findOne({ _id: id, owner }).populate('photos');
  if (!dog) throw new Error('Dog not found');

  return dog;
};

export const updateDog = async (id, owner, data) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  const dog = await Dog.findOneAndUpdate({ _id: id, owner }, data, { new: true });
  if (!dog) throw new Error('Dog not found');

  if (data.profilePicture) {
    dog.profilePicture = data.profilePicture;
    await dog.save();
  }

  return dog;
};

export const deleteDog = async (id, owner) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  const dog = await Dog.findOneAndDelete({ _id: id, owner });
  if (!dog) throw new Error('Dog not found');

  return dog;
};
