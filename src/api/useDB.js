import { useContext } from 'react';
import memoize from 'memoizee';
import stringify from 'fast-json-stable-stringify';
import useCreateAndCleanup from '../utils/useCreateAndCleanup.js';

export function createUseDB({ DBContext, PouchDB, useDBInstance }) {
  return function useDB(
    any,
    { callee = 'useDB', example = 'useDB(options)' } = {}
  ) {
    const dbArg = any instanceof PouchDB ? any : undefined;
    const options = dbArg ? undefined : any;
    const dbInstance = useDBInstance(options);
    const dbContext = useContext(DBContext);

    const db = dbArg ?? dbInstance ?? dbContext;

    if (!db) {
      throw new Error(
        callee
          ? `\`${callee}\` was called without \`db\` and database is not in context. Provide database using <PouchDB> or \`${example}\``
          : 'Database is not in context. Provide database using <PouchDB>'
      );
    }
    return db;
  };
}
