import PouchDB from 'pouchdb';
import stringify from 'json-stable-stringify';
import get from './getWithDefaultValue';

const dbs = new Map();
const userCounts = new Map();

export function create(options) {
  const key = stringify(options);
  const db = dbs::get(key, () => new PouchDB(options));
  const userCount = userCounts::get(key, () => 0);
  userCounts.set(key, userCount + 1);
  return db;
}

export function close(options) {
  const key = stringify(options);
  const userCount = userCounts::get(key) - 1;
  userCounts.set(key, userCount);
  if (!userCount) {
    this.close();
    dbs.delete(key);
  }
}
