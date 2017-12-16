import { todoCount } from 'todomvc-app-css/index.css';
import { Find } from 'react-pouchdb/browser';

export default () => (
  <Find
    selector={{
      completed: { $ne: true }
    }}
    render={({ docs: { length } }) => (
      <span className={todoCount}>
        {length} {length === 1 ? 'item' : 'items'} left
      </span>
    )}
  />
);
