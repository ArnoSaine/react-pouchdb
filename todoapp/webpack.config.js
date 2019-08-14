import path from 'path';

export default env => config => {
  const {
    resolve: { alias, modules }
  } = config;

  alias.react = path.resolve('./node_modules/react');

  modules.push('shared');

  return config;
};
