import memoize from 'memoizee';
import stringify from 'fast-json-stable-stringify';
import useCreateAndCleanup from '../../utils/useCreateAndCleanup.js';

export default function createUseDBInstance(PouchDB) {
  const dbMemoized = memoize(
    ({
      maxListeners,
      // PouchDB constructor modifies the options object. Make sure options is a
      // copy so the original object remains untouched.
      ...options
    }) => {
      const db = new PouchDB(options);
      if (maxListeners) {
        db.setMaxListeners(maxListeners);
      }
      return db;
    },
    {
      refCounter: true,
      dispose(db) {
        db.close();
      },
      normalizer: stringify,
    }
  );

  return function useDBInstance(options) {
    if (typeof options === 'string') {
      options = { name: options };
    }
    return useCreateAndCleanup(
      () => options && dbMemoized(options),
      () => options && dbMemoized.deleteRef(options),
      [stringify(options)]
    );
  };
}
