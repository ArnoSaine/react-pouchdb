import PouchDB from 'pouchdb';

export default function createPouchDB({
  // Time to wait for suspended component to actually mount and subscribe.
  synchronousAPITemporarySubscriptionCleanupDelay,
  // Limit excessive re-rendering from bulkDocs:
  // Time to wait more changes. Final update is made after this, if there were more updates.
  // Set null to disable debouncing updates.
  debounceUpdatesWait,
  // Limit update frequency.
  debounceUpdatesMaxWait,
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
    reactPouchDBOptions: {
      synchronousAPITemporarySubscriptionCleanupDelay,
      debounceUpdatesWait,
      debounceUpdatesMaxWait
    }
  });
}
