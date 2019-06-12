import { useEffect } from 'react';
import sleep from 'sleep';
import { useDB } from 'react-pouchdb/browser';

export default function InitializeDB({ children }) {
  const db = useDB();
  useEffect(() => {
    (async () => {
      await sleep(1000);
      await db.put({ _id: 'a', value: 'created' });
    })();
  }, [db]);
  return children;
}
