import { update } from 'lodash';
import createDeprecationWarning from '../../utils/createDeprecationWarning.js';
import * as AllDocs from '../AllDocs.js';
import * as Find from '../Find.js';
import * as Get from '../Get.js';
import { createPouchDB } from '../PouchDB.js';
import { createUseDB } from '../useDB.js';
import { createWithDB } from '../withDB.js';
import createComponent from './Component.js';
import createDBContext from './DBContext.js';
import createHook from './hook.js';
import createUseDBInstance from './useDBInstance.js';

const api = Object.entries({ AllDocs, Find, Get }).map(([name, config]) => ({
  name,
  ...config,
}));

const deprecationWarning = createDeprecationWarning(
  "Imports from 'react-pouchdb/(node/|browser/)concurrent' has been deprecated and will be removed in the next major release. Please use the new 'react-pouchdb/(node/|browser/)loading-state' API instead."
);

export default function create({ PouchDBConstructor, useAsync, loadingState }) {
  if (loadingState === 'legacy') {
    deprecationWarning();
  }
  const DBContext = createDBContext(PouchDBConstructor);
  const useDBInstance = createUseDBInstance(PouchDBConstructor);
  const useDB = createUseDB({
    DBContext,
    useDBInstance,
    PouchDB: PouchDBConstructor,
  });
  const PouchDB = createPouchDB({ DBContext, useDBInstance });
  const withDB = createWithDB(useDB);

  const result = { DBContext, PouchDB, useDB, useDBInstance, withDB };

  for (const { name, setup, events, as } of api) {
    const hookName = `use${name}`;

    setup?.({ PouchDBConstructor });

    const hook = createHook({
      as,
      events,
      loadingState,
      name: hookName,
      useAsync,
      useDB,
    });
    const component = createComponent({
      as,
      loadingState,
      name,
      useAPI: hook,
      useDB,
    });

    result[hookName] = hook;
    result[name] = component;
  }

  return result;
}
