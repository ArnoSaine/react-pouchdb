const path = require('path');

module.exports = env => config => {
  config.resolve.alias.react = path.resolve('./node_modules/react');
  return config;
};
