import PouchDB from 'pouchdb';

export default function createPouchDB({
  // Time to wait for suspended component to actually mount and subscribe.
  synchronousAPIInitialSubscriptionCleanupDelay,
  maxListeners,
  ...options
}) {
  const db = new PouchDB(
    // PouchDB constructor modifies the options object. Make sure options is a
    // copy so the original object remains untouched.
    options
  );
  if (maxListeners) {
    db.setMaxListeners(maxListeners);
  }
  return Object.assign(db, {
    reactPouchDBOptions: { synchronousAPIInitialSubscriptionCleanupDelay }
  });
}
