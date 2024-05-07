import { createMatch, getFriendsWithDogs, unfriendUser } from '../services/matchService.js';

export const match = async (req, res) => {
  try {
    const matchResult = await createMatch(req.user._id, req.params.dogId);
    res.status(201).json(matchResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const friends = async (req, res) => {
  try {
    const friends = await getFriendsWithDogs(req.user._id);
    res.status(200).json(friends);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const unfriend = async (req, res) => {
  try {
    const { currentUserId, friendId } = req.params;
    const result = await unfriendUser(currentUserId, friendId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
