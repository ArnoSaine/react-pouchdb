import React from 'react';
import { useDB, useFind } from 'react-pouchdb/browser';

export default function ToggleAll() {
  const docs = useFind({
    selector: {
      timestamp: { $gte: null }
    }
  });
  const { bulkDocs } = useDB();
  return docs
    ? (() => {
        const { length } = docs;
        return length
          ? (() => {
              const completed = docs.every(({ completed }) => completed);
              return (
                <>
                  <input
                    id="toggle-all"
                    className="toggle-all"
                    checked={completed}
                    onChange={() =>
                      bulkDocs(
                        docs.map(doc => ({ ...doc, completed: !completed }))
                      )
                    }
                    type="checkbox"
                  />
                  <label htmlFor="toggle-all" />
                </>
              );
            })()
          : null;
      })()
    : null;
}
