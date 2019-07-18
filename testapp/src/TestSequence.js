import { useEffect, useState } from 'react';
import sleep from 'sleep';
import { useDB } from 'react-pouchdb/browser';
import { config } from 'Test';

export default function TestSequence({ children }) {
  const db = useDB();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    (async () => {
      let a = await db.put({ _id: 'a', value: 'created' });
      setInitialized(true);
      await sleep(config.sleep);
      let b = await db.put({ _id: 'b', value: 'created' });
      await sleep(config.sleep);
      a = await db.put({ _id: 'a', _rev: a.rev, value: 'update' });
      b = await db.put({ _id: 'b', _rev: b.rev, value: 'update' });
      await sleep(config.sleep);
      await db.remove({ _id: 'a', _rev: a.rev });
      await db.remove({ _id: 'b', _rev: b.rev });
    })();
  }, [db]);
  return initialized ? children : null;
}
