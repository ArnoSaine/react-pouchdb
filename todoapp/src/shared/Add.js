import { useEffect } from 'react';
import { useFind } from 'react-pouchdb/browser';

export default function Add({ useReset, dbName, items }) {
  const docs = useFind(dbName, {
    selector: {}
  });
  const reset = useReset();
  useEffect(() => {
    (async () => {
      if (!items.every(id => docs.find(({ _id }) => _id === id))) {
        reset();
      }
    })();
  }, [items, docs, reset]);
  return null;
}
