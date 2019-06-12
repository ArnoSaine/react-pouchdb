import { useState, useEffect } from 'react';
import PouchDB from 'pouchdb-browser';

export default function DestroyDB({ name, children }) {
  const [destroyed, setDestroyed] = useState(false);
  useEffect(() => {
    (async () => {
      let db = new PouchDB(name);
      await db.destroy();
      setDestroyed(true);
    })();
  }, [name]);
  return destroyed ? children : null;
}
