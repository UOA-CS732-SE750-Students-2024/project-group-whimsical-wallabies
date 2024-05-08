// eslint-disable-next-line no-undef
const buildApiPath = (path) => `${process.env.REACT_APP_API_URL}${path}`;

export const API_PATH = {
  auth: {
    login: buildApiPath('/api/auth/login'),
    signup: buildApiPath('/api/auth/register')
  }
};

export const APPLICATION_PATH = {
  auth: {
    login: '/login',
    signup: '/signup'
  },
  user: {
    profile: '/profile',
    friends: '/friends'
  },
  dog: {
    dashboard: '/my-dogs',
    profile: '/dog/:id'
  },
  friends: {
    dogs: '/friends/:friendId',
    dog: '/dog/:userId/:dogId'
  },
  matching: '/matching',
  dashboard: '/dashboard',
  homepage: '/',
  friendList: '/friendlist'
};
