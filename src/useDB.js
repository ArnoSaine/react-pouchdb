import { useContext, useState } from 'react';
import PouchDB from 'pouchdb';
import stringify from 'fast-json-stable-stringify';
import DBContext from './DBContext';
import { create, close } from './pouchdbConnections';

export function useDBOptions(options) {
  const key = stringify(options);
  const [prevOptions, setPrevOptions] = useState(options);
  const [prevKey, setPrevKey] = useState(key);
  const [db, setDB] = useState(options ? () => create(options) : undefined);

  if (key !== prevKey) {
    if (prevOptions) {
      close(prevOptions);
    }
    if (options) {
      setDB(create(options));
    }
    setPrevOptions(options);
    setPrevKey(key);
  }

  return db;
}

export function useDBContext() {
  return useContext(DBContext);
}

export default function useDB(
  any,
  { callee = 'useDB', example = 'useDB(options)' } = {}
) {
  const dbInstance = any instanceof PouchDB ? any : undefined;
  const options = dbInstance ? undefined : any;
  const dbOptions = useDBOptions(options);
  const dbContext = useDBContext();

  const db = dbInstance || dbOptions || dbContext;

  if (!db) {
    throw new Error(
      callee
        ? `\`${callee}\` was called without \`db\` and database is not in context. Provide database using <PouchDB /> or \`${example}\``
        : 'Database is not in context. Provide database using <PouchDB />'
    );
  }
  return db;
}
