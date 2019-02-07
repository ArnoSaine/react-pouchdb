# react-pouchdb

React wrapper for PouchDB that also subscribes to changes.

[TodoMVC example](https://arnosaine.github.io/react-pouchdb/)

## Contents

- [Examples](#examples)
  - [Hooks](#hooks)
  - [Components](#components)
- [API](#api)
  - [`useGet`](#usegetdb-options)
  - [`useFind`](#usefinddb-options)
  - [`useDB`](#usedbdb)
  - [`<PouchDB>`](#pouchdb)
  - [`<Get>`](#get)
  - [`<Find>`](#find)
  - [`withDB`](#withdbdb-component)
- [Package dependencies](#package-dependencies)

## Examples

### Hooks

```js
import { Suspense } from "react";
import { useFind, useDB } from "react-pouchdb";

function MyComponent() {
  const docs = useFind({
    selector: {
      name: { $gte: null }
    },
    sort: ["name"]
  });
  const db = useDB();

  return (
    <ul>
      {docs.map(doc => (
        <li key={doc._id}>
          {doc.name}
          <button onClick={() => db.remove(doc)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

<PouchDB name="dbname">
  <Suspense fallback="loading...">
    <MyComponent />
  </Suspense>
</PouchDB>;
```

### Components

```js
import { Suspense } from "react";
import { PouchDB, Find } from "react-pouchdb";

<PouchDB name="dbname">
  <Suspense fallback="loading...">
    <Find
      selector={{
        name: { $gte: null }
      }}
      sort={["name"]}
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
  </Suspense>
</PouchDB>;
```

## API

### `useGet([db,] options)`

Get document and listen to changes.

**`db: string|object` (optional)**

Override context value or use as an alternative to `<PouchDB>`.

**`options: object`**

Options to [`get`](https://pouchdb.com/api.html#fetch_document). If **other** than `attachments`, `ajax` or `binary` options are set, live changes are disabled.

**`options.attachments: string|object` (optional)**

Include document attachments. Set to `"u8a"` to get attachments as `Uint8Array`s.

```js
import { useGet } from "react-pouchdb";

function MyComponent() {
  const doc = useGet({ id: "mydoc" });
  return <div>{doc.name}</div>;
}
```

### `useFind([db,] options)`

Find documents and listen to changes.

**`db: string|object`**

Override context value or use as an alternative to `<PouchDB>`.

**`options: object`**

Options to [`find`](https://pouchdb.com/api.html#query_index).

```js
import { useFind } from "react-pouchdb";

function MyComponent() {
  const docs = useFind({
    selector: {
      name: { $gte: null }
    },
    sort: ["name"]
  });
  return (
    <ul>
      {docs.map(doc => (
        <li key={doc._id}>{doc.name}</li>
      ))}
    </ul>
  );
}
```

### `useDB([db])`

**`db: string|object`**

Override context value or use as an alternative to `<PouchDB>`.

```js
import { useDB } from "react-pouchdb";

function MyComponent({ title }) {
  const db = useDB();
  return <button onClick={() => db.post({ title })}>Add</button>;
}
```

### `<PouchDB>`

Connect to a database and provide it from context to other components and hooks.

**`name: string`**

**`maxListeners: number`**

Similar change requests are pooled, but you might still need to increase the number of `maxListeners`.

**`...rest: any`**

Other props are passed to [PouchDB constructor](https://pouchdb.com/api.html#create_database) as second argument.

```js
<PouchDB name="dbname">
  <App />
</PouchDB>
```

### `<Get>`

Get document and listen to changes.

**`db: string|object`**

Override context value or use as an alternative to `<PouchDB>`.

```js
<Get db="dbname" id="mydoc" ... />
```

**`id: string`**

`docId`.

**`component`**

_Component_ is rendered with props `db` and `doc` when the initial request completes and when the document is updated. If the document is not found, `doc` is `undefined`.

```js
<Get id="mydoc" component={Title} />
```

**`render: func`**

`render` function is called with props `db` and `doc` when the initial request completes and when the document is updated. If the document is not found, `doc` is `undefined`.

```js
<Get id="mydoc" render={({ doc }) => <h1>{doc.title}</h1>} />
```

**`children: func|element`**

Render while the request is pending, completed and document is updated. Function is called / component is rendered / element is cloned with props `db` and `doc`.

```js
<Get id="mydoc" children={({ doc }) => (doc ? <h1>{doc.title}</h1> : null)} />
```

**`attachments: bool|string`**

Include document attachments. Set to `"u8a"` to get attachments as `Uint8Array`s.

```js
<Get
  attachments
  id="mydoc"
  render={({ doc }) => (
    <>
      <h1>{doc.title}</h1>
      <code>{doc._attachments["att.txt"].data}</code>
    </>
  )}
/>
```

**`...rest: any`**

Other props are passed to [`get`](https://pouchdb.com/api.html#fetch_document) method as second argument. If **other** than `attachments`, `ajax` or `binary` props are provided, live changes are disabled.

### `<Find>`

Find documents and listen to changes.

**`db: string|object`**

Override context value or use as an alternative to `<PouchDB>`.

```js
<Find db="dbname" selector={...} ... />
```

**`selector: object`**

**`sort: array`**

**`limit: number`**

**`skip: number`**

See [`find`](https://pouchdb.com/api.html#query_index).

**`component`**

**`render: func`**

**`children: func|element`**

Render props are as in `<Get>` component. Render methods will be passed `db` and `docs` props.

```js
<Find
  selector={{
    name: { $gte: null }
  }}
  sort={["name"]}
  render={({ docs }) => (
    <ul>
      {docs.map(doc => (
        <li key={doc._id}>{doc.name}</li>
      ))}
    </ul>
  )}
/>
```

### `withDB([db,] Component)`

Higher-order component for accessing the PouchDB instance anywhere in the `<PouchDB>` children. Note that for convenience `<Get>` and `<Find>` render methods will be passed the `db` prop as well.

```js
import { withDB } from "react-pouchdb";

const MyComponent = withDB(({ db, title }) => (
  <button onClick={() => db.post({ title })}>Add</button>
));
```

## Package dependencies

The package expects `pouchdb` to be available. If you use `pouchdb-browser` or `pouchdb-node` import from `react-pouchdb/browser` or `react-pouchdb/node` respectively.
