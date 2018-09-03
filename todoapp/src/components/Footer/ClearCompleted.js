import { clearCompleted } from 'todomvc-app-css/index.css';
import { Find } from 'react-pouchdb/browser';

export default () => (
  <Find
    selector={{
      completed: true
    }}
    render={({ db, docs, docs: { length } }) =>
      length ? (
        <button
          className={clearCompleted}
          onClick={() =>
            db.bulkDocs(docs.map(doc => ({ ...doc, _deleted: true })))
          }
          type="button"
        >
          Clear completed ({length})
        </button>
      ) : null
    }
  />
);
