import User from '../models/User.js';

import { createDog, getDogs, getDog, updateDog, deleteDog } from '../services/dogService.js';
import { getMatchingDogs } from '../services/matchService.js';
import { calculateDistance } from '../utils/common.js';

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

export const getAllOthers = async (req, res) => {
  try {
    const manualMatch = (req.query?.manualMatch?.toLowerCase() || 'false') === 'true' || false;
    const currentUser = await User.findById(req.user._id);
    const uniqueMatches = await getMatchingDogs(currentUser, manualMatch);

    const dogsWithDistance = await Promise.all(
      uniqueMatches.map(async (dog) => {
        const owner = await User.findById(dog.owner);
        const distance = calculateDistance(
          currentUser.latitude,
          currentUser.longitude,
          owner.latitude,
          owner.longitude
        );
        return { ...dog._doc, distance };
      })
    );
    res.status(200).json(dogsWithDistance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
