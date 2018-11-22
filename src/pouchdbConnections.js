import PouchDB from 'pouchdb';
import stringify from 'fast-json-stable-stringify';
import get from './getWithDefaultValue';

const dbs = new Map();
const userCounts = new Map();

const withOptionsObject = f => options =>
  f(typeof options === 'string' ? { name: options } : options);

export const create = withOptionsObject(({ maxListeners, ...options }) => {
  const key = stringify(options);
  const db = dbs::get(key, () => {
    const db = new PouchDB(
      typeof options === 'string'
        ? options
        : // PouchDB constructor modifies the options object. Make a copy, so
          // the original object remains untouched.
          { ...options }
    );
    if (maxListeners) {
      db.setMaxListeners(maxListeners);
    }
    return db;
  });
  const userCount = userCounts::get(key, () => 0);
  userCounts.set(key, userCount + 1);
  return db;
});

export const close = withOptionsObject(({ maxListeners, ...options }) => {
  const key = stringify(options);
  const userCount = userCounts.get(key) - 1;
  userCounts.set(key, userCount);
  if (!userCount) {
    dbs.get(key).close();
    dbs.delete(key);
  }
});
