import Dog from '../models/Dog.js';
import Photo from '../models/Photo.js';

export const createPhoto = async (dog, url) => {
  const dogExists = await Dog.findById(dog);
  if (!dogExists) throw new Error('Dog not found');

  const dogPhoto = new Photo({ dog, url });
  await dogPhoto.save();

  return dogPhoto;
};

export const getPhotos = async (dog) => {
  const dogExists = await Dog.findById(dog);
  if (!dogExists) throw new Error('Dog not found');

  return await Photo.find({ dog });
};

export const deletePhoto = async (dog, _id) => {
  const dogExists = await Dog.findById(dog);
  if (!dogExists) throw new Error('Dog not found');

  const photo = await Photo.findOneAndDelete({ _id, dog });
  if (!photo) throw new Error('Photo not found');

  return photo;
};
