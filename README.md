# react-pouchdb

React wrapper for PouchDB that also subscribes to changes.

[TodoMVC](https://arnosaine.github.io/react-pouchdb/) example.

## Example

```js
import { PouchDB, Find } from 'react-pouchdb';

<PouchDB name="dbname">
  <Find
    selector={{
    name: { $gte: null }
  }}
    sort={['name']}
    render={({ db, docs }) => (
      <ul>
        {docs.map(doc => (
          <li key={doc._id}>
            {doc.name}
            <button onClick={() => db.remove(doc)}>Remove</button>
          </li>
      ))}
      </ul>
  )}
  />
</PouchDB>
```

## API

### `<PouchDB>`

Connect to a database.

##### `name: string`

##### `maxListeners: number`

Similar change requests are pooled, but you might still need to increase the number of `maxListeners`.

##### `...rest: any`

Other props are passed to [PouchDB](https://pouchdb.com/api.html#create_database) constructor as second argument.

```js
<PouchDB name="dbname">
  <App />
</PouchDB>
```

### `<Get>`

Get document and listen to changes.

##### `id: string`

`docId`.

##### `component`

Component is rendered with props `db`, `doc` and `exists`, if the document is found and/or updated. If the document is deleted, component will unmount.

```js
<Get id="mydoc" component={Title} />
```

##### `render: func`

`render` function is called with props `db`, `doc` and `exists`, if the document is found and/or updated. If the document is deleted, component will unmount.

```js
<Get id="mydoc" render={({doc}) => <h1>{doc.title}</h1>} />
```

##### `children: func|element`

Render whether the document exists or not. Function is called / element is cloned with props `db`, `doc` and `exists`.

```js
<Get
  id="mydoc"
  children={({ doc, exists }) =>
    exists ? <h1>{doc.title}</h1> : <h1>NotFound</h1>
  }
/>
```

##### `attachments: bool|string`

Include document attachments. Set to `"u8a"` to get attachments as `Uint8Array`s.

```js
<Get
  attachments
  id="mydoc"
  render={({ attachments, doc }) => (
    <>
      <h1>{doc.title}</h1>
      <code>{attachments['att.txt'].data}</code>
    </>
  )}
/>
```

##### `...rest: any`

Other props are passed to [`db.get`](https://pouchdb.com/api.html#fetch_document) method as second argument. Note that if you provide props **other** than `attachments`, `ajax` or `binary`, live changes are disabled.

### `<Find>`

Find documents and listen to changes.

##### `selector: object`

##### `sort: array`

##### `limit: number`

##### `skip: number`

See [`db.find`](https://pouchdb.com/api.html#query_index).

##### `component`

##### `render: func`

##### `children: func|element`

Render methods will be passed `db` and `docs` props. `db` is the [PouchDB](https://pouchdb.com/api.html) instance.

```js
<Find
  selector={{
    name: { $gte: null }
  }}
  sort={['name']}
  render={({ docs }) => (
    <ul>{docs.map(doc => <li key={doc._id}>{doc.name}</li>)}</ul>
  )}
/>
```

### `withDB`

Higher-order component for accessing the [PouchDB](https://pouchdb.com/api.html) instance anywhere in the `<PouchDB>` children. Note that for convenience `<Get>` and `<Find>` render methods will be passed the `db` prop as well.

```js
import { withDB } from 'react-pouchdb';

export default withDB(({ db, title }) => (
  <button
    onClick={() =>
      db.post({
        title
      })
    }
  >
    Add
  </button>
));
```

## Package dependencies

The package expects `pouchdb` to be available. If you use `pouchdb-browser` or `pouchdb-node` import from `react-pouchdb/browser` or  `react-pouchdb/node` respectively.

## License

ISC
