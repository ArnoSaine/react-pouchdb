const { dirname, relative } = require('path');

const api = [
  'PouchDB',
  'useDB',
  'useAllDocs',
  'useFind',
  'useGet',
  'AllDocs',
  'Find',
  'Get',
  'withDB',
  'DBContext',
  'useDBInstance',
].join(',');

module.exports = ({ module, pouchdb, loadingState = false }) => {
  const root =
    relative(dirname(module.filename), `${__dirname}/src`).replace(
      /\\/g,
      '/'
    ) || '.';
  module.exports = `import PouchDBConstructor from '${pouchdb}';
import create from '${root}/${loadingState ? 'loading-state/' : ''}create.js';

const {${api}} = create(PouchDBConstructor, ${JSON.stringify(loadingState)});

export {${api}};
`;
};
