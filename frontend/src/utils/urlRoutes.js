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
    friends: '/dashboard'
  },
  dog: {
    dashboard: '/my-dogs',
    profile: '/dog/:id'
  },
  matching: '/matching',
  dashboard: '/dashboard',
  homepage: '/',
  friendlist: '/friendlist',
  filter: '/filter'
};
