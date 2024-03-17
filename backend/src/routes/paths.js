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
  login: '/login'
};

export const THIRD_PARTY_APIS = {
  base: '/api/external',
  getWeather: '/get-weather',
  promptQuestion: '/ask-chat-gpt'
};
