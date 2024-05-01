// eslint-disable-next-line no-undef
const buildApiPath = (path) => `${process.env.REACT_APP_API_URL}${path}`;

export const API_PATH = {
  auth: {
    login: buildApiPath('/api/auth/login'),
    signup: buildApiPath('/api/auth/register')
  },
  dog: {
    add: buildApiPath('/api/dog/add'),
    profile: buildApiPath('/api/dog/profile'),
    dogs: buildApiPath('/api/dog/dogs')
  }
};

export const APPLICATION_PATH = {
  auth: {
    login: '/login',
    signup: '/signup'
  },
  dog: {
    add: '/add',
    profile: '/dog/:id',
    dogDashboard: '/dogs'
  }
};
