import { learn } from 'todomvc-common/base.css';

export default () => (
  <aside className={learn}>
    <header>
      <h3>react-pouchdb</h3>
      <h5>Example</h5>
      <a href="https://github.com/ArnoSaine/react-pouchdb/tree/master/todoapp">
        Source
      </a>
    </header>
    <hr />
    <h4>Official Resources</h4>
    <ul>
      {[
        {
          href: 'https://github.com/ArnoSaine/react-pouchdb',
          children: 'react-pouchdb'
        },
        {
          href: 'https://pouchdb.com',
          children: 'PouchDB'
        },
        {
          href: 'http://couchdb.apache.org',
          children: 'CouchDB'
        }
      ].map(props => (
        <li key={props.href}>
          <a {...props} />
        </li>
      ))}
    </ul>
  </aside>
);
