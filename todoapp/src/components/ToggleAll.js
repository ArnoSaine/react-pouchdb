import { toggleAll } from 'todomvc-app-css/index.css';
import { Find } from 'react-pouchdb/browser';

export default () => (
  <Find
    selector={{
      timestamp: { $gte: null }
    }}
    render={({ db, docs, docs: { length } }) =>
      length
        ? do {
            const completed = docs.every(({ completed }) => completed);
            <>
              <input
                id="toggle-all"
                className={toggleAll}
                checked={completed}
                onChange={() =>
                  db.bulkDocs(
                    docs.map(doc => ({ ...doc, completed: !completed }))
                  )
                }
                type="checkbox"
              />
              <label htmlFor="toggle-all" />
            </>;
          }
        : null
    }
  />
);
