import { useCallback } from 'react';
import { useDB } from 'react-pouchdb/browser';

export default function useReset(dbName, items, load) {
  const { allDocs, bulkDocs } = useDB(dbName);
  return useCallback(async () => {
    const { rows } = await allDocs();
    bulkDocs({
      docs: await Promise.all(
        items.map(async _id => ({
          _id,
          _rev: rows.find(({ id }) => id === _id)?.value.rev,
          ...(await load(_id))
        }))
      )
    });
  }, [allDocs, bulkDocs, items, load]);
}
