// eslint-disable-next-line no-undef
const buildApiPath = (path) => `${process.env.REACT_APP_API_URL}${path}`;

export const API_PATH = {
  auth: {
    login: buildApiPath('/api/auth/login')
  }
};

export const APPLICATION_PATH = {
  auth: {
    login: '/login'
  }
};
