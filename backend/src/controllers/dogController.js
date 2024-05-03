import { createDog, getDogs, getDog, updateDog, deleteDog } from '../services/dogService.js';

export const create = async (req, res) => {
  try {
    const dog = await createDog(req.user._id, req.body);
    res.status(201).json(dog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const dogs = await getDogs(req.user._id);
    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const dog = await getDog(req.params.id, req.user._id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const dogData = (req?.file?.path && { ...req.body, profilePicture: req.file.path }) || req.body;
    const dog = await updateDog(req.params.id, req.user._id, dogData);
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteDog(req.params.id, req.user._id);
    res.status(204).json({ message: 'Dog deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
