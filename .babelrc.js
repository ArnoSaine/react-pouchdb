const { outDir = '' } = require('yargs').argv;

const outDirParts = outDir.split('/');

const options = {
  presets: ['library-util/cjs/babel-preset', '@babel/preset-flow'],
  plugins: ['codegen']
};

const target = ['browser', 'node'].find(target => outDirParts.includes(target));

if (target) {
  options.plugins.push([
    'transform-rename-import',
    { original: 'pouchdb', replacement: `pouchdb-${target}` }
  ]);
}

module.exports = options;
