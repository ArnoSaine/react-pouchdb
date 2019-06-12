import { useState, useEffect } from 'react';
import PouchDB from 'pouchdb-browser';

export default function DestroyDB({ children }) {
  const [destroyed, setDestroyed] = useState(false);
  useEffect(() => {
    (async () => {
      let db = new PouchDB('test');
      await db.destroy();
      setDestroyed(true);
    })();
  }, []);
  return destroyed ? children : null;
}
