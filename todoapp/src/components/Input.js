import { newTodo } from 'todomvc-app-css/index.css';
import { withDB } from 'react-pouchdb/browser';

export default withDB(({ db }) => (
  <input
    autoFocus
    className={newTodo}
    onKeyDown={({ keyCode, target }) => {
      const title = target.value.trim();
      if (keyCode === 13 && title) {
        db.post({ title, timestamp: Date.now() });
        target.value = '';
      }
    }}
    placeholder="What needs to be done?"
    type="text"
  />
));
