import { useDB, useFind } from 'react-pouchdb/browser';
import useT from 'useT';

export default function ClearCompleted() {
  const docs = useFind({
    selector: {
      completed: true
    }
  });
  const { bulkDocs } = useDB();
  const t = useT();
  const { length } = docs;
  return length ? (
    <button
      className="clear-completed"
      onClick={() => bulkDocs(docs.map(doc => ({ ...doc, _deleted: true })))}
      type="button"
    >
      {t('clearCompleted', { length })}
    </button>
  ) : null;
}
