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
  - [`useAllDocs`](#usealldocsdb-options)
  - [`useDB`](#usedbdb)
  - [`<PouchDB>`](#pouchdb)
  - [`<Get>`](#get)
  - [`<Find>`](#find)
  - [`<AllDocs>`](#alldocs)
  - [`withDB`](#withdbdb-component)
  - [`create`](#createpouchdb)
- [API Variants](#api-variants)
  - [Synchronous](#synchronous)
  - [Concurrent](#concurrent)
- [Package dependencies](#package-dependencies)
- [Not ready for Suspense?](#not-ready-for-suspense)

## Examples

### Hooks

```js
import { Suspense } from 'react';
import { PouchDB, useFind, useDB } from 'react-pouchdb';

function MyComponent() {
  const docs = useFind({
    selector: {
      name: { $gte: null },
    },
    sort: ['name'],
  });
  const db = useDB();

  return (
    <ul>
      {docs.map((doc) => (
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
import { Suspense } from 'react';
import { PouchDB, Find } from 'react-pouchdb';

<PouchDB name="dbname">
  <Suspense fallback="loading...">
    <Find
      selector={{
        name: { $gte: null },
      }}
      sort={['name']}
      children={({ db, docs }) => (
        <ul>
          {docs.map((doc) => (
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

Override the context value or use as an alternative to `<PouchDB>`.

**`options: object`**

Options to [`get`](https://pouchdb.com/api.html#fetch_document). If **other** than `id`, `attachments`, `ajax` or `binary` options are set, live changes are disabled.

**`options.attachments: bool|string` (optional)**

Include document attachments. Set to `"u8a"` to get attachments as `Uint8Array`s.

**Returns**

| Value            | Description                                                | Example                                       |
| ---------------- | ---------------------------------------------------------- | --------------------------------------------- |
| undefined        | Request is pending (only in [Concurrent API](#concurrent)) | `undefined`                                   |
| null             | Missing document                                           | `null`                                        |
| Document         | Found document                                             | `{"_id": ..., "_rev": ..., ...}`              |
| Deleted document | Deleted document                                           | `{"_id": ..., "_rev": ..., "_deleted": true}` |

```js
import { useGet } from 'react-pouchdb';

function MyComponent() {
  const doc = useGet({ id: 'mydoc' });
  return <div>{doc.name}</div>;
}
```

### `useFind([db,] options)`

Find documents and listen to changes.

**`db: string|object` (optional)**

Override the context value or use as an alternative to `<PouchDB>`.

**`options: object`**

Options to [`find`](https://pouchdb.com/api.html#query_index).

**`options.sort: (string|object)[]` (optional)**

If **sort** is present, then it will be used to create a mango index with [`createIndex`](https://pouchdb.com/api.html#create_index).

**Returns**

| Value     | Description                                                | Example                                 |
| --------- | ---------------------------------------------------------- | --------------------------------------- |
| undefined | Request is pending (only in [Concurrent API](#concurrent)) | `undefined`                             |
| Array     | List of documents                                          | `[{"_id": ..., "_rev": ..., ...}, ...]` |

```js
import { useFind } from 'react-pouchdb';

function MyComponent() {
  const docs = useFind({
    selector: {
      name: { $gte: null },
    },
    sort: ['name'],
  });
  return (
    <ul>
      {docs.map((doc) => (
        <li key={doc._id}>{doc.name}</li>
      ))}
    </ul>
  );
}
```

### `useAllDocs([db,] options)`

Get multiple rows of document meta-data (**id** and **rev**) with optional the documents and listen to changes.

**`db: string|object` (optional)**

Override the context value or use as an alternative to `<PouchDB>`.

**`options: object`**

Options to [`allDocs`](https://pouchdb.com/api.html#batch_fetch).

**`options.attachments: bool|string` (optional)**

Include document attachments. Set to `"u8a"` to get attachments as `Uint8Array`s.

**Returns**

| Value     | Description                                                                  | Example                                                                              |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| undefined | Request is pending (only in [Concurrent API](#concurrent))                   | `undefined`                                                                          |
| Array     | List of document meta data with the document. The rows-field from `allDocs`. | `[{"id": "doc_id", "key": "doc_id", "value": { "rev": ... }, "doc": { ... } }, ...]` |

```js
import { useAllDocs } from 'react-pouchdb';

function MyComponent() {
  const rows = useAllDocs({
    include_docs: true,
    startkey: 'profile_',
    endkey: 'profile_\uffff',
  });
  return (
    <ul>
      {rows.map((row) => (
        <li key={row.id}>{row.doc.name}</li>
      ))}
    </ul>
  );
}
```

### `useDB([db])`

Get the PouchDB instance from the context.

**`db: string|object` (optional)**

Override the context value or use as an alternative to `<PouchDB>`.

```js
import { useDB } from 'react-pouchdb';

function MyComponent({ title }) {
  const db = useDB();
  return <button onClick={() => db.post({ title })}>Add</button>;
}
```

### `<PouchDB>`

Connect to a database and provide it from the context to other components and hooks.

**`name: string`**

**`maxListeners: number`**

Similar change requests are detected and cached. You might still need to increase the number of `maxListeners`, if you use `useGet` / `<Get>` with lots of different options.

**`...rest: any`**

Other props are passed to [PouchDB constructor](https://pouchdb.com/api.html#create_database) as a second argument.

```js
<PouchDB name="dbname">
  <App />
</PouchDB>
```

### `<Get>`

Get document and listen to changes.

**`db: string|object` (optional)**

Override the context value or use as an alternative to `<PouchDB>`.

```js
<Get db="dbname" id="mydoc" ... />
```

**`id: string`**

`docId`.

**`children: func|component|element`**

Function is called / component is rendered / element is cloned with props `db` and `doc`. See [`useGet`](#usegetdb-options) return value for possible values for `doc`.

```js
<Get id="mydoc" children={({ doc }) => <h1>{doc.title}</h1>} />
```

**`attachments: bool|string`**

Include document attachments. Set to `"u8a"` to get attachments as `Uint8Array`s.

```js
<Get
  attachments
  id="mydoc"
  children={({ doc }) => (
    <>
      <h1>{doc.title}</h1>
      <code>{doc._attachments['att.txt'].data}</code>
    </>
  )}
/>
```

**`...rest: any`**

Other props are passed to [`get`](https://pouchdb.com/api.html#fetch_document) method as second argument. If **other** than `attachments`, `ajax` or `binary` props are provided, live changes are disabled.

### `<Find>`

Find documents and listen to changes.

**`db: string|object` (optional)**

Override the context value or use as an alternative to `<PouchDB>`.

```js
<Find db="dbname" selector={...} ... />
```

**`selector: object`**

**`sort: array`**

If **sort** is present, then it will be used to create a mango index with [`createIndex`](https://pouchdb.com/api.html#create_index).

**`limit: number`**

**`skip: number`**

See [`find`](https://pouchdb.com/api.html#query_index).

**`children: func|component|element`**

Function is called / component is rendered / element is cloned with props `db` and `docs`. See [`useFind`](#usefinddb-options) return value for possible values for `docs`.

```js
<Find
  selector={{
    name: { $gte: null },
  }}
  sort={['name']}
  children={({ docs }) => (
    <ul>
      {docs.map((doc) => (
        <li key={doc._id}>{doc.name}</li>
      ))}
    </ul>
  )}
/>
```

### `<AllDocs>`

Get multiple rows of document meta-data (**id** and **rev**) with optional the documents and listen to changes.

**`db: string|object` (optional)**

Override the context value or use as an alternative to `<PouchDB>`.

```js
<AllDocs db="dbname" include_docs ... />
```

**`include_docs: bool`**

**`conflicts: bool`**

**`attachments: bool|string`**

Include document attachments. Set to `"u8a"` to get attachments as `Uint8Array`s.

**`startkey: string`**

**`endkey: string`**

**`descending: bool`**

**`keys: string[]`**

**`limit: number`**

**`skip: number`**

See [`allDocs`](https://pouchdb.com/api.html#batch_fetch).

**`children: func|component|element`**

Function is called / component is rendered / element is cloned with props `db` and `rows`. See [`useAllDocs`](#usealldocsdb-options) return value for possible values for `rows`.

```js
<AllDocs
  include_docs
  startkey="profile_"
  endkey="profile_\uffff"
  children={({ rows }) => (
    <ul>
      {rows.map((row) => (
        <li key={doc.id}>{row.doc.name}</li>
      ))}
    </ul>
  )}
/>
```

### `withDB([db,] Component)`

Higher-order component for accessing the PouchDB instance anywhere in the `<PouchDB>` children. Note that for convenience `<Get>` and `<Find>` render methods will be passed the `db` prop as well.

```js
import { withDB } from 'react-pouchdb';

const MyComponent = withDB(({ db, title }) => (
  <button onClick={() => db.post({ title })}>Add</button>
));
```

### `create(PouchDB)`

Create an API that uses other PouchDB edition.

```js
import create from 'react-pouchdb/create';
// For `isLoading` style API:
// import create from 'react-pouchdb/loading-state/create';
import PouchDBConstructor from 'pouchdb-react-native';

const { PouchDB, useGet, useFind } = create(PouchDBConstructor);
```

## Package dependencies

The package expects `pouchdb` to be available.

If you use `pouchdb-browser` or `pouchdb-node`, import from `react-pouchdb/browser` or `react-pouchdb/node` respectively. For other PouchDB editions, use [`create`](#createpouchdb).

If you use `pouchdb-browser` or `pouchdb-node`, and [`isLoading`](#not-ready-for-suspense) style API, import from `react-pouchdb/browser/loading-state` or `react-pouchdb/node/loading-state` respectively.

## Not ready for Suspense?

Import from `react-pouchdb/loading-state` to use the `{ isLoading, <doc|docs|rows> }` style API, where name of the data property (`<doc|docs|rows>`) depends on the API used. Example:

```js
import { useFind } from 'react-pouchdb/loading-state';

function MyComponent() {
  const { isLoading, docs } = useFind({
    selector: {
      name: { $gte: null },
    },
    sort: ['name'],
  });

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <ul>
      {docs.map((doc) => (
        //...
      ))}
    </ul>
  );
}
```

### Concurrent

> ⚠ This API has been deprecated in favor of [`isLoading`](#not-ready-for-suspense) and the default (Suspense) style APIs. It will be removed in the next major release.

Requests are made simultaneously. The disadvantage is that while a request is pending, the API returns `undefined`, which user must handle without error, i.e. render `null` or a loading indicator.

Import from `react-pouchdb/concurrent`, `react-pouchdb/browser/concurrent` or `react-pouchdb/node/concurrent`, to use the Concurrent API. Example:

```js
import { useFind } from 'react-pouchdb/concurrent';
```
