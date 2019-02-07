import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import { collate } from 'pouchdb-collate';
import { matchesSelector } from 'pouchdb-selector-core';
import changesCache from './changesCache';
import useDB from './useDB';
import useListen from './useListen';

PouchDB.plugin(find);

export default function useFind(db, options = db) {
  if (arguments.length < 2) {
    db = undefined;
  }
  db = useDB(db, {
    callee: 'useFind',
    example: 'useFind(db, options)'
  });
  const { selector, limit, skip, sort } = options;

  return useListen(
    db,
    options,
    async () => {
      if (sort) {
        await db.createIndex({
          index: {
            fields: sort.map(field =>
              typeof field === 'object' ? Object.keys(field)[0] : field
            )
          }
        });
      }
      return (await db.find(options)).docs;
    },
    (docs, setDocs) => {
      // setDocs(docs);
      let mutableDocs;
      if (docs) {
        mutableDocs = [...docs];
      }
      // To find deleted and other non-matching documents, listen all changes and use selector in 'change' event.
      return db::changesCache(
        {
          live: true,
          include_docs: true,
          since: 'now',
          // Documents are kept in memory. 'complete' event can return an empty array.
          return_docs: false
        },
        async ({ deleted, doc }) => {
          const index = mutableDocs?.findIndex(({ _id }) => doc._id === _id);
          const found = index !== -1;
          // Document was deleted or it does not match the selector?
          if (deleted || (selector && !matchesSelector(doc, selector))) {
            if (found) {
              // Remove.
              mutableDocs.splice(index, 1);
              const { length } = mutableDocs;
              // At the limit?
              if (length + 1 === limit) {
                const {
                  docs: [replacementDoc]
                } = await db.find({
                  ...options,
                  limit: 1,
                  skip: (options.skip || 0) + length
                });
                if (replacementDoc) {
                  docs.push(replacementDoc);
                }
              }
              setDocs([...mutableDocs]);
            }
          } else {
            if (found) {
              // Update.
              mutableDocs[index] = doc;
            } else {
              // Create.
              if (!mutableDocs) {
                mutableDocs = [];
              }
              mutableDocs.push(doc);
            }
            if (sort) {
              const sortOrders = sort.map(prop =>
                typeof prop === 'object'
                  ? Object.entries(prop)[0]
                  : // Default sort order is 'asc'
                    [prop, 'asc']
              );
              mutableDocs.sort((a, b) => {
                for (const [prop, order] of sortOrders) {
                  const result = collate(a[prop], b[prop]);
                  if (result !== 0) {
                    return order === 'asc' ? result : -result;
                  }
                }
                return 0;
              });
            }
            const sortedIndex = mutableDocs.findIndex(
              ({ _id }) => doc._id === _id
            );
            // Document update, new place supposed to be last, `limit` option is set and limit was reached?
            if (found && sortedIndex + 1 === limit) {
              // Get the actual last document.
              const {
                docs: [lastDoc]
              } = await db.find({
                ...options,
                limit: 1,
                skip: (options.skip || 0) + sortedIndex
              });
              if (lastDoc?._id !== doc._id) {
                mutableDocs[sortedIndex] = lastDoc;
              }
            }
            // `skip` option is set and document supposed to be first?
            if (skip && sortedIndex === 0) {
              // Get the actual first document.
              const {
                docs: [firstDoc]
              } = await db.find({
                ...options,
                limit: 1
              });
              if (firstDoc?._id !== doc._id) {
                mutableDocs[0] = firstDoc;
              }
            }
            if (mutableDocs.length > limit) {
              mutableDocs.splice(limit);
            }
            setDocs([...mutableDocs]);
          }
        }
      );
    }
  );
}
