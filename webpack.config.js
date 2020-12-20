import path from 'path';

export default (env) => (config) => {
  config.resolve.alias[process.env.npm_package_name] = path.resolve('.');
  return config;
};
