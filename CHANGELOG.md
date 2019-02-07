# 1.0.0-alpha.1

- Update DB connection when `<PouchDB />` props change
- Fix infinite suspense loop if database request throws error
- Update dependencies

# 1.0.0-alpha.0

- Add Hooks API.
- Add optional `db` prop to `<Get>` and `<Find>`.
- **Breaking change:** remove `exists` prop from `<Get>` render methods. Use `!!doc`.
- **Breaking change:** remove `attachment` prop from `<Get>` render methods. Use `doc._attachments`.
- **Breaking change:** `component` and `render` render props require the use of `<Suspense>` as a parent component.
- **Breaking change:** `<Get>` render props are called even if document does not exist.

# 0.3.2

- Fix #5: Using `<Find />` with `sort` option and remote database.

# 0.3.1

- Update package-lock.json.

# 0.3.0

- Update dependencies (major).

# 0.2.1

- Update dependencies (minor).

# 0.2.0

- Use new React 16.3 context and ref APIs. Ready for React 17.

# 0.1.6

- Update `peerDependencies`: Remove compatibility with React 17.

# 0.1.5

- [#3](https://github.com/ArnoSaine/react-pouchdb/pull/3) Immutable manipulation on docs array in find. ([@bkniffler](https://github.com/bkniffler))

# 0.1.4

- Fix closing the database on unmount.

# 0.1.3

- Pool PouchDB connections.

# 0.1.2

- Add package.json repository field.
- Add missing dependency @babel/runtime.
- Update example.

# 0.1.1

- Fix gh-pages example.
- Update readme.

# 0.1.0

- First release.
