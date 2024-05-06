import Dog from '../models/Dog.js';
import User from '../models/User.js';
import { dogGroups } from './dogGroupsData.js';

export const createMatch = async (currentUserId, otherDogId) => {
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) throw new Error('User not found');
  const otherDog = await Dog.findById(otherDogId).populate('owner');
  if (!otherDog) throw new Error('Dog not found');

  if (currentUser.equals(otherDog.owner._id)) throw new Error('Cannot match with your own dog');
  if (currentUser.friends.includes(otherDog.owner._id)) return 'Match created';

  const otherDogOwner = otherDog.owner;
  if (!otherDogOwner) throw new Error('Owner of the dog not found');

  if (otherDogOwner.like.includes(currentUserId)) {
    otherDogOwner.like = otherDogOwner.like.filter((id) => !id.equals(currentUserId));
    currentUser.likeMe = currentUser.like.filter((id) => !id.equals(otherDogOwner._id));

    if (!currentUser.friends.includes(otherDogOwner._id)) {
      currentUser.friends.push(otherDogOwner._id);
    }

    if (!otherDogOwner.friends.includes(currentUserId)) {
      otherDogOwner.friends.push(currentUserId);
    }

    await currentUser.save();
    await otherDogOwner.save();
  } else {
    otherDogOwner.likeMe.push(currentUserId);
    currentUser.like.push(otherDogOwner._id);
    await otherDogOwner.save();
    await currentUser.save();
    return 'Match created';
  }
};

export const getFriendsWithDogs = async (currentUserId) => {
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) throw new Error('User not found');

  const populatedUser = await User.findById(currentUserId).populate({
    path: 'friends',
    model: 'User',
    select: '-password -like -likeMe -friends -latitude -longitude',
    populate: {
      path: 'dogs',
      model: 'Dog'
    }
  });

  return populatedUser.friends;
};

export const getAllDogsExceptUser = async (currentUserId) => {
  const user = await User.findById(currentUserId);
  if (!user) throw new Error('User not found');
  const friendsIds = user.friends.map(({ _id }) => _id);
  const excludeOwners = [currentUserId, ...friendsIds];
  return await Dog.find({ owner: { $nin: excludeOwners } });
};

function findGroupByBreed(breed, groups) {
  for (const group in groups) {
    if (groups[group].includes(breed)) {
      return group;
    }
  }
  return null;
}

export const getMatchingDogs = async (currentUser) => {
  const userDogs = await Dog.find({ owner: currentUser._id });
  const allOtherDogs = await getAllDogsExceptUser(currentUser._id);

  const dogGroupCache = new Map();
  const getDogGroups = (dog) => {
    if (!dogGroupCache.has(dog._id.toString())) {
      dogGroupCache.set(dog._id.toString(), {
        sizeGroup: findGroupByBreed(dog.breed, dogGroups.dogSizeGroups),
        temperamentGroup: findGroupByBreed(dog.breed, dogGroups.dogTemperamentGroups)
      });
    }
    return dogGroupCache.get(dog._id.toString());
  };

  let matchesForUserDogs = userDogs.map((userDog) => {
    const { sizeGroup: userSizeGroup, temperamentGroup: userTempGroup } = getDogGroups(userDog);

    const matches = allOtherDogs.filter((otherDog) => {
      const { sizeGroup: otherSizeGroup, temperamentGroup: otherTempGroup } =
        getDogGroups(otherDog);
      return userSizeGroup === otherSizeGroup && userTempGroup === otherTempGroup;
    });

    return { dog: userDog, matches };
  });

  const flatMatches = [];
  matchesForUserDogs.forEach((item) => flatMatches.push(...item.matches));

  return Array.from(new Set(flatMatches.map((dog) => dog._id.toString()))).map((id) =>
    flatMatches.find((dog) => dog._id.toString() === id)
  );
};
