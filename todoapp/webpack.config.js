import { resolve } from 'path';

// eslint-disable-next-line import/no-anonymous-default-export
export default env => config => {
  config.resolve.alias.react = resolve('./node_modules/react');
  return config;
};
