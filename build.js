import { sync } from 'cross-spawn';
import { flatten } from 'lodash';
import { writeFileSync } from 'fs';

flatten(
  [[], ['browser'], ['node']].map(path =>
    ['es', 'cjs'].map(target => [...path, target].join('/'))
  )
).forEach(outDir =>
  sync(
    'npx',
    [...`babel src --out-dir ${outDir}`.split(' '), ...process.argv.slice(5)],
    {
      stdio: 'inherit'
    }
  )
);

['browser', 'node'].forEach(target =>
  writeFileSync(
    `${target}/package.json`,
    JSON.stringify(
      {
        name: `${process.env.npm_package_name}/${target}`,
        version: process.env.npm_package_version,
        main: 'cjs',
        module: 'es'
      },
      null,
      2
    )
  )
);
