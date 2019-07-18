import fsExtra from 'fs-extra';

const { ensureDirSync, readJsonSync, writeJsonSync } = fsExtra;

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

['browser/concurrent', 'node/concurrent', 'concurrent'].forEach(target => {
  ensureDirSync(target);
  writeJsonSync(
    `${target}/package.json`,
    {
      name: `@${process.env.npm_package_name}/${target}`,
      version: process.env.npm_package_version,
      main: '../cjs/concurrent',
      module: '../es/concurrent'
    },
    { spaces: 2 }
  );
});

[
  'testapp/package.json',
  'testapp/package-lock.json',
  'todoapp/package.json',
  'todoapp/package-lock.json'
].forEach(file =>
  updateJsonSync(file, value => ({
    ...value,
    version: process.env.npm_package_version
  }))
);
