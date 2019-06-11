import Dotenv from 'dotenv-webpack';
import path from 'path';

export default env => config => {
  const {
    plugins,
    resolve: { alias, modules }
  } = config;

  alias.react = path.resolve('./node_modules/react');

  plugins.push(new Dotenv());

  modules.push('shared');

  return config;
};
