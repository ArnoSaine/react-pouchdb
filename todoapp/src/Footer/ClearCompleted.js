import { useDB, useFind } from 'react-pouchdb/browser';

export default function ClearCompleted() {
  const docs = useFind({
    selector: {
      completed: true
    }
  });
  const { bulkDocs } = useDB();
  const { length } = docs;
  return length ? (
    <button
      className="clear-completed"
      onClick={() => bulkDocs(docs.map(doc => ({ ...doc, _deleted: true })))}
    >
      Clear completed ({length})
    </button>
  ) : null;
}
