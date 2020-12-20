import { Repeater } from '@repeaterjs/repeater';
import attachmentsAsUint8Arrays from '../attachmentsAsUint8Arrays';
import changes from '../changes';

const UINT8ARRAY = 'u8a';

/**
 * Converts all attachments of a document into Uint8Arrays, if the binary option is set.
 * @param {boolean} binary Should the attachments be converted into an Uint8Array.
 * @param {object} doc The document.
 */
async function formatDocAttachments(binary, doc) {
  return binary && doc && !doc._deleted && '_attachments' in doc
    ? {
        ...doc,
        _attachments: await attachmentsAsUint8Arrays(doc._attachments),
      }
    : doc;
}

/**
 * Transforms a change object into a row object.
 * @param {boolean} includeDocs Should documents be included in the allDocs result.
 * @param {boolean} binary Should the attachments be converted into an Uint8Array.
 * @param {object} change PouchDB-Change-Object.
 */
async function transformToRow(includeDocs, binary, change) {
  return {
    id: change.id,
    key: change.id,
    value: change.changes[0],
    doc:
      includeDocs && change.doc
        ? await formatDocAttachments(binary, change.doc)
        : undefined,
  };
}

/**
 * Converts all attachments into Uint8Arrays.
 * The rows will be updated in place, while the documents are copied.
 * @param {Object[]} rows Rows that should be updated IN PLACE.
 */
function formatRowsAttachments(binary, rows) {
  // The mapped value is the Promise. The rows will be updated in place!
  const converting = rows.map(async (row) => {
    if (row.doc && row.doc._attachments) {
      row.doc = await formatDocAttachments(binary, row.doc);
    }
  });

  return Promise.all(converting);
}

export const events = (options = {}, db) =>
  new Repeater(async (push, stop) => {
    const {
      startkey,
      endkey,
      descending,
      attachments,
      limit,
      skip,
      ...otherOptions
    } = options;
    const binary = attachments === UINT8ARRAY;

    const optionsWithAttachmentAndBinaryOption = {
      // binary option will be overwritten by otherOptions.binary
      // so that a Blob can be used.
      binary,
      startkey,
      endkey,
      descending,
      limit,
      skip,
      ...otherOptions,
      attachments: !!attachments,
    };
    const keysMode = options.keys != null;
    const keyMode = options.key != null;

    const changesOptions = {
      live: true,
      include_docs: optionsWithAttachmentAndBinaryOption.include_docs,
      since: 'now',
      // Documents are kept in memory. 'complete' event can return an empty array.
      return_docs: false,
    };
    // add keys/key to only subscribe to those.
    if (keyMode) {
      changesOptions.doc_ids = [optionsWithAttachmentAndBinaryOption.key];
    } else if (keysMode) {
      changesOptions.doc_ids = optionsWithAttachmentAndBinaryOption.keys;
    }

    const { rows } = await db.allDocs(optionsWithAttachmentAndBinaryOption);
    if (binary) {
      await formatRowsAttachments(binary, rows);
    }
    const update = () => push([...rows]);
    update();

    const toRow = transformToRow.bind(null, options.include_docs, binary);

    const cancel = db::changes(changesOptions, async (change) => {
      const { id, deleted } = change;

      // guards that check if the document's id is between startkey and endkey.
      // But only if they exist.
      if (
        startkey != null &&
        ((descending && id > startkey) || (!descending && id < startkey))
      ) {
        return;
      }
      if (
        endkey != null &&
        ((descending && id < endkey) ||
          (!descending && id > endkey) ||
          // if inclusive_end is omitted, it defaults to true
          (options.inclusive_end === false && endkey === id))
      ) {
        return;
      }

      const index = rows.findIndex((row) => row.id === id);
      const found = index !== -1;

      // Document was deleted
      if (deleted) {
        if (found) {
          // remove row
          rows.splice(index, 1);

          // ranges mode (with startkey and endkey)
          // If it was on the limit load the next row/document.
          if (rows.length + 1 === limit && !keysMode && !keyMode) {
            const lastId = rows[rows.length - 1].id;
            const replacementRows = await db.allDocs({
              ...optionsWithAttachmentAndBinaryOption,
              startkey: lastId,
              skip: 1,
              limit: 1,
            });
            if (binary) {
              await formatRowsAttachments(binary, replacementRows.rows);
            }
            rows.push(...replacementRows.rows);
          } else if (keysMode && !keyMode) {
            const replacementRows = await db.allDocs({
              ...optionsWithAttachmentAndBinaryOption,
              keys: [id],
            });
            if (binary) {
              await formatRowsAttachments(binary, replacementRows.rows);
            }
            rows.splice(index, 0, ...replacementRows.rows);
          }

          update();
        }
      } else if (found) {
        rows[index] = await toRow(change);
        update();
      } else {
        // add the new row
        let insertIndex = rows.findIndex(
          descending
            ? (row) => row.id < id // if descending find the first row with a smaller id
            : (row) => row.id > id // else find the first row with a bigger id
        );
        if (insertIndex === -1) {
          // If no index was found, then push it to the end
          if (limit != null && rows.length === limit) {
            // But not if the limit is already exceeded
            return;
          }
          insertIndex = rows.length;
        }

        rows.splice(insertIndex, 0, await toRow(change));

        if (limit != null && rows.length > limit) {
          // remove the last row if the limit was exceeded.
          rows.pop();
        }
        update();
      }
    });
    await stop;
    cancel();
  });

export const as = 'rows';
