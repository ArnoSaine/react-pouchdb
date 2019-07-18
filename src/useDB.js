import { useContext, useMemo, useEffect } from 'react';
import PouchDB from 'pouchdb';
import stringify from 'fast-json-stable-stringify';
import DBContext from './DBContext';
import createPouchDB from './createPouchDB';
import createStore from './createStore';

const store = createStore();

export function useDBOptions(options) {
  const optionsObject =
    typeof options === 'string' ? { name: options } : options;
  const key = stringify(optionsObject);
  const optionsMemoized = useMemo(() => optionsObject, [key]);
  const dependencies = [optionsMemoized];
  const [value, cleanup] = useMemo(
    () =>
      key === undefined
        ? []
        : store([key], () => [
            optionsMemoized ? createPouchDB(optionsMemoized) : undefined,
            value => value?.close()
          ]),
    dependencies
  );
  useEffect(() => cleanup, dependencies);
  return value;
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

  const db = dbInstance ?? dbOptions ?? dbContext;

  if (!db) {
    throw new Error(
      callee
        ? `\`${callee}\` was called without \`db\` and database is not in context. Provide database using <PouchDB /> or \`${example}\``
        : 'Database is not in context. Provide database using <PouchDB />'
    );
  }
  return db;
}
