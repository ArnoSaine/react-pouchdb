import { readJsonSync, writeJsonSync } from 'fs-extra';

const updateJsonSync = (file, updater) =>
  writeJsonSync(file, updater(readJsonSync(file)), { spaces: 2 });

['browser', 'node'].forEach(target => {
  writeJsonSync(
    `${target}/package.json`,
    {
      name: `@${process.env.npm_package_name}/${target}`,
      version: process.env.npm_package_version,
      main: 'cjs',
      module: 'es'
    },
    { spaces: 2 }
  );
});

updateJsonSync('todoapp/package.json', value => ({
  ...value,
  version: process.env.npm_package_version
}));
