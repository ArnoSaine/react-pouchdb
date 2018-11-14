import React from 'react';
import { useDB, useFind } from 'react-pouchdb/browser';

export default function Counter() {
  const { bulkDocs } = useDB();
  const docs = useFind({
    selector: {
      completed: true
    }
  });
  return docs
    ? (() => {
        const { length } = docs;
        return length ? (
          <button
            className="clear-completed"
            onClick={() =>
              bulkDocs(docs.map(doc => ({ ...doc, _deleted: true })))
            }
            type="button"
          >
            Clear completed ({length})
          </button>
        ) : null;
      })()
    : null;
}
