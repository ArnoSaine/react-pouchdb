import { Route } from 'react-router-dom';
import { todoList } from 'todomvc-app-css/index.css';
import { Find } from 'react-pouchdb/browser';
import Item from './Item';

const filterByCompletedField = {
  active: { $ne: true },
  completed: true
};

export default () => (
  <Route
    path="/:filter?"
    render={({
      match: {
        params: { filter }
      }
    }) => (
      <Find
        selector={{
          timestamp: { $gte: null },
          completed: filterByCompletedField[filter]
        }}
        sort={['timestamp']}
        render={({ docs }) => (
          <ul className={todoList}>
            {docs.map(doc => (
              <Item key={doc._id} doc={doc} />
            ))}
          </ul>
        )}
      />
    )}
  />
);
