export const buildPathWithBase = (authPaths) => {
  const { base, ...paths } = authPaths;
  return Object.keys(paths).reduce((acc, key) => {
    acc[key] = `${base}${paths[key]}`;
    return acc;
  }, {});
};

export const AUTH_PATHS = {
  base: '/api/auth',
  register: '/register',
  login: '/login',
  profile: '/profile'
};

export const THIRD_PARTY_APIS = {
  base: '/api/external',
  getWeather: '/get-weather',
  promptQuestion: '/ask-chat-gpt'
};

export const DOG_PATHS = {
  base: '/api/dog',
  create: '/',
  getAll: '/',
  getOne: '/:id',
  update: '/:id',
  remove: '/:id',
  getOthers: '/user/:userId'
};

export const DOG_POTENTIAL_MATES_PATHS = {
  base: '/api/potential-mates',
  getAll: '/'
};

export const PHOTO_PATHS = {
  base: '/',
  create: '/',
  getAll: '/',
  remove: ':photoId'
};

export const USER_PATHS = {
  base: '/api/user',
  getUser: '/:username',
  updateUser: '/:username'
};

export const MATCH_PATHS = {
  base: '/api/match',
  match: '/:dogId',
  friends: '/',
  unfriend: '/:currentUserId/:friendId'
};
