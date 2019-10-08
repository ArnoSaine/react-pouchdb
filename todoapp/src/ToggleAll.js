import { useDB, useFind } from 'react-pouchdb/browser';
import Dynamic from 'Dynamic';

export default function ToggleAll() {
  const docs = useFind({
    selector: {}
  });
  const { bulkDocs } = useDB();
  return docs.length
    ? do {
        const completed = docs.every(({ completed }) => completed);
        return (
          <Dynamic
            id="toggleAll"
            completed={completed}
            onChange={() =>
              bulkDocs(docs.map(doc => ({ ...doc, completed: !completed })))
            }
          />
        );
      }
    : null;
}
