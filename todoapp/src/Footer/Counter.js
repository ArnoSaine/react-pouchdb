import React from 'react';
import { useFind } from 'react-pouchdb/browser';

export default function Counter() {
  const docs = useFind({
    selector: {
      completed: { $ne: true }
    }
  });
  return docs
    ? (() => {
        const { length } = docs;
        return (
          <span className="todo-count">
            {length} {length === 1 ? 'item' : 'items'} left
          </span>
        );
      })()
    : null;
}
