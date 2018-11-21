export default () => (
  <aside className="learn">
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
          url: 'https://github.com/ArnoSaine/react-pouchdb',
          text: 'react-pouchdb'
        },
        {
          url: 'https://pouchdb.com',
          text: 'PouchDB'
        },
        {
          url: 'http://couchdb.apache.org',
          text: 'CouchDB'
        }
      ].map(({ text, url }) => (
        <li key={url}>
          <a href={url}>{text}</a>
        </li>
      ))}
    </ul>
  </aside>
);
