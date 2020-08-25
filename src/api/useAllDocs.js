import { useMemo } from 'react';
import stringify from 'fast-json-stable-stringify';
import reverseArgs from '../utils/reverseArgs';
import changes from '../changes';
import useDB from '../useDB';

const UINT8ARRAY = 'u8a';

const changesOptions = {
  live: true,
  include_docs: true,
  since: 'now',
  // Documents are kept in memory. 'complete' event can return an empty array.
  return_docs: false
};

export default useListen =>
  reverseArgs(function useAllDocs(options, db) {
    db = useDB(db, {
      callee: 'useAllDocs',
      example: 'useAllDocs(db, options)'
    });

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

    const optionsWithAttachmentAndBinaryOption = useMemo(
      () => ({
        binary,
        startkey,
        endkey,
        descending,
        limit,
        skip,
        ...otherOptions,
        attachments: !!attachments
      }),
      [
        binary,
        startkey,
        endkey,
        descending,
        limit,
        skip,
        stringify(otherOptions),
        !!attachments
      ]
    );
    const keysMode = options.key != null;
    const keyMode = options.keys != null;

    return useListen(db, options, async setValue => {
      const { rows } = await db.allDocs(optionsWithAttachmentAndBinaryOption);
      const update = () => setValue([...rows]);
      update();

      return db::changes(changesOptions, async ({ deleted, id, doc }) => {
        const index = rows.findIndex(row => row.id === id);
        const found = index !== -1;

        // Document was deleted
        if (deleted) {
          if (found) {
            // remove row
            rows.splice(index, 1);

            if (rows.length + 1 === limit && !keysMode && !keyMode) {
              const lastId = rows[rows.length - 1].id;
              const replacementRows = await db.allDocs({
                ...optionsWithAttachmentAndBinaryOption,
                startkey: lastId,
                skip: 1,
                limit: 1
              });
              rows.push(...replacementRows.rows);
            } else if (keysMode && !keyMode) {
              const replacementRows = await db.allDocs({
                ...optionsWithAttachmentAndBinaryOption,
                keys: [id]
              });
              rows.splice(index, 0, ...replacementRows.rows);
            }

            update();
          }
          return;
        }

        if (found) {
          rows[index] = {
            id,
            key: id,
            value: {
              rev: doc._rev
            },
            doc: optionsWithAttachmentAndBinaryOption.include_docs
              ? doc
              : undefined
          };
          update();
        }
      });
    });
  });
