import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import { collate } from 'pouchdb-collate';
import { matchesSelector } from 'pouchdb-selector-core';
import { forbidExtraProps } from 'airbnb-prop-types';
import { number, object, array } from 'prop-types';
import BaseComponent from './BaseComponent';
import changesCache from './changesCache';
import renderProps, { propTypes } from './renderProps';

PouchDB.plugin(find);

export default class Find extends BaseComponent {
  static propTypes = forbidExtraProps({
    ...propTypes,
    limit: number,
    selector: object.isRequired,
    skip: number,
    sort: array
  });
  state = {
    docs: []
  };
  async listen(options) {
    const { context: { db } } = this;
    const { selector, limit, skip, sort } = options;
    if (selector) {
      if (sort) {
        await db.createIndex({
          index: {
            fields: sort.map(
              field =>
                typeof field === 'object' ? Object.keys(field)[0] : field
            )
          }
        });
      }
      const { docs } = await db.find(options);
      if (this.setStateIfMounted({ docs })) {
        // To find deleted and other non-matching documents, listen all changes
        // and use selector in 'change' event.
        this.cancel = db::changesCache(
          {
            live: true,
            include_docs: true,
            since: 'now',
            // Documents are kept in memory. 'complete' event can return an
            // empty array.
            return_docs: false
          },
          async ({ deleted, doc }) => {
            const { docs } = this.state;
            const index = docs.findIndex(({ _id }) => doc._id === _id);
            const found = index !== -1;
            // Document was deleted or it does not match the selector?
            if (deleted || (selector && !matchesSelector(doc, selector))) {
              if (found) {
                // Remove.
                docs.splice(index, 1);
                const { length } = docs;
                // At the limit?
                if (length + 1 === limit) {
                  const { docs: [replacementDoc] } = await db.find({
                    ...options,
                    limit: 1,
                    skip: (options.skip || 0) + length
                  });
                  if (replacementDoc) {
                    docs.push(replacementDoc);
                  }
                }
                this.setStateIfMounted({
                  docs
                });
              }
            } else {
              if (found) {
                // Update.
                docs[index] = doc;
              } else {
                // Create.
                docs.push(doc);
              }
              if (sort) {
                const sortOrders = sort.map(
                  prop =>
                    typeof prop === 'object'
                      ? Object.entries(prop)[0]
                      : // Default sort order is 'asc'
                        [prop, 'asc']
                );
                docs.sort((a, b) => {
                  for (const [prop, order] of sortOrders) {
                    const result = collate(a[prop], b[prop]);
                    if (result !== 0) {
                      return order === 'asc' ? result : -result;
                    }
                  }
                  return 0;
                });
              }
              const sortedIndex = docs.findIndex(({ _id }) => doc._id === _id);
              // Document update, new place supposed to be last, `limit` option
              // is set and limit was reached?
              if (found && sortedIndex + 1 === limit) {
                // Get the actual last document.
                const { docs: [lastDoc] } = await db.find({
                  ...options,
                  limit: 1,
                  skip: (options.skip || 0) + sortedIndex
                });
                if (lastDoc?._id !== doc._id) {
                  docs[sortedIndex] = lastDoc;
                }
              }
              // `skip` option is set and document supposed to be first?
              if (skip && sortedIndex === 0) {
                // Get the actual first document.
                const { docs: [firstDoc] } = await db.find({
                  ...options,
                  limit: 1
                });
                if (firstDoc?._id !== doc._id) {
                  docs[0] = firstDoc;
                }
              }
              if (docs.length > limit) {
                docs.splice(limit);
              }
              this.setStateIfMounted({
                docs
              });
            }
          }
        );
      }
    }
  }
  render() {
    const { context: { db }, props, state: { docs } } = this;
    return renderProps(props, docs, { db, docs });
  }
}
