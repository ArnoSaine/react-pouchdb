import spawn from 'cross-spawn';
import flatten from 'lodash/flatten';
import fromPairs from 'lodash/fromPairs';
import kebabCase from 'lodash/kebabCase';
import yargs from 'yargs';

const {
  argv,
  argv: { outDir }
} = yargs(process.argv.slice(2));

const args = flatten(
  Object.entries(
    fromPairs(
      Object.entries(argv)
        .filter(([name]) => name !== '_' && name[0] !== '$')
        .map(([name, value]) => [
          kebabCase(name),
          value === true ? undefined : value
          // typeof value === 'boolean' ? (value ? undefined : 'false') : value
        ])
    )
  )
    .filter(([name]) => name !== 'out-dir')
    .map(([key, value]) => [`--${key}`, value])
).filter(Boolean);

flatten(
  [[], ['browser'], ['node']].map(path =>
    ['es', 'cjs'].map(target =>
      [...(outDir ? [outDir] : []), ...path, target].join('/')
    )
  )
).forEach(outDir =>
  spawn('npx', [...`babel src --out-dir ${outDir}`.split(' '), ...args], {
    stdio: 'inherit'
  })
);
