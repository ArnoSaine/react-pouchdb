import Dotenv from 'dotenv-webpack';

export default env => config => {
  const {
    plugins,
    resolve: { modules }
  } = config;

  plugins.push(new Dotenv());

  modules.push('shared');

  return config;
};
