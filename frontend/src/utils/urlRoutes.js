// eslint-disable-next-line no-undef
const buildApiPath = (path) => `${process.env.REACT_APP_API_URL}${path}`;

export const API_PATH = {
  auth: {
    login: buildApiPath('/api/auth/login'),
    signup: buildApiPath('/api/auth/register')
  },
  dog: {
    profile: buildApiPath('/api/dog/profile'), //not sure if this is correct
    dogs: buildApiPath('/api/dog/dogs') //not sure if this is correct
  }
};

export const APPLICATION_PATH = {
  auth: {
    login: '/login',
    signup: '/signup'
  },
  dog: {
    dogDashboard: '/:ownerId/dog',
    profile: '/:ownerId/dog/:id'
  }
};
