import { resolve } from 'path';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default (env) => (config) => {
  // In development, fix issue with more than one copy of React.
  config.resolve.alias.react = resolve('./node_modules/react');

  // In development, fix issue of relative imports outside of the project src/
  // directory.
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin)
  );

  return config;
};
