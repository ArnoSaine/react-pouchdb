import { useState, useEffect } from 'react';
import PouchDB from 'pouchdb-browser';
import sleep from 'sleep';

export default function InitializeDB({ children }) {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    (async () => {
      let db = new PouchDB('test');
      await db.destroy();
      setInitialized(true);
      db = new PouchDB('test');
      await sleep(1000);
      await db.put({ _id: 'a', value: 'created' });
    })();
  }, []);
  return initialized ? children : null;
}
