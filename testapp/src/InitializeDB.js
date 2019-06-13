import { useEffect, useState } from 'react';
import sleep from 'sleep';
import { useDB } from 'react-pouchdb/browser';

export default function InitializeDB({ children }) {
  const db = useDB();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    (async () => {
      await db.put({ _id: 'a', value: 'created' });
      setInitialized(true);
      await sleep(1000);
      await db.put({ _id: 'b', value: 'created' });
    })();
  }, [db]);
  return initialized ? children : null;
}
