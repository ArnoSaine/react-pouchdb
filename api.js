const { dirname, relative } = require('path');

module.exports = module => {
  const root =
    relative(dirname(module.filename), `${__dirname}/src`).replace(
      /\\/g,
      '/'
    ) || '.';
  module.exports = `import apiAllDocs from '${root}/api/AllDocs';
import apiFind from '${root}/api/Find';
import apiGet from '${root}/api/Get';
import apiUseFind from '${root}/api/useFind';
import apiUseGet from '${root}/api/useGet';
import apiUseAllDocs from '${root}/api/useAllDocs';
import useListen from './useListen';

export PouchDB from '${root}/PouchDB';
export withDB from '${root}/withDB';
export * as DBContext from '${root}/DBContext';
export useDB from '${root}/useDB';
export const useFind = apiUseFind(useListen);
export const useGet = apiUseGet(useListen);
export const useAllDocs = apiUseAllDocs(useListen);
export const AllDocs = apiAllDocs(useAllDocs);
export const Find = apiFind(useFind);
export const Get = apiGet(useGet);`;
};
