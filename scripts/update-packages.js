import fs from 'fs-extra';
import path from 'path';

const targets = [
  'concurrent',
  'loading-state',
  'browser',
  'browser/concurrent',
  'browser/loading-state',
  'node',
  'node/concurrent',
  'node/loading-state',
  'create.js',
  'loading-state/create.js',
];

const targetFile = (target) =>
  path.extname(target) ? target : `${target}/main.js`;

const targetDir = (target) => {
  const dirname = path.dirname(target);
  return `${dirname === '.' ? '' : `${dirname}/`}${path.basename(
    target,
    path.extname(target)
  )}`;
};

for (const target of targets) {
  const root = '../'.repeat(target.split('/').length);
  const targetBasename = targetDir(target);
  await fs.ensureDir(targetBasename);
  await fs.writeJson(
    `${targetBasename}/package.json`,
    {
      name: `${process.env.npm_package_name}-${target.replace(/\//g, '-')}`,
      version: process.env.npm_package_version,
      main: `${root}cjs/${targetFile(target)}`,
      module: `${root}mjs/${targetFile(target)}`,
    },
    { spaces: 2 }
  );
}

const updateJson = async (
  file,
  updater,
  options = { spaces: 2 },
  readOptions
) =>
  fs.writeJson(
    file,
    await updater(await fs.readJson(file, readOptions)),
    options
  );

await updateJson('package.json', (packageJson) => ({
  ...packageJson,
  exports: {
    '.': './mjs/main.js',
    ...Object.fromEntries(
      targets.map((target) => [
        `./${targetDir(target)}`,
        `./mjs/${targetFile(target)}`,
      ])
    ),
  },
}));
