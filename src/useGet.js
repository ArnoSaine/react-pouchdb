import attachmentsAsUint8Arrays from './attachmentsAsUint8Arrays';
import changesCache from './changesCache';
import useDB from './useDB';
import useListen from './useListen';

const UINT8ARRAY = 'u8a';
const ALLOWED_LIVE_OPTIONS = ['attachments', 'ajax', 'binary', 'id'];

async function nextState(binary, doc) {
  return {
    attachments: binary
      ? await attachmentsAsUint8Arrays(doc._attachments)
      : doc._attachments,
    doc,
    exists: !doc._deleted
  };
}

export default function useGet(db, options = db) {
  const { id, attachments, ...otherOptions } = options;
  const binary = attachments === UINT8ARRAY;
  const optionsWithAttachmentAndBinaryOption = {
    binary,
    ...otherOptions,
    attachments: !!attachments
  };
  db =
    useDB({
      callee: 'useGet',
      example: 'useGet(db, options)',
      test: arguments.length === 1
    }) ?? db;
  return useListen(
    db,
    options,
    async () => {
      try {
        return await nextState(
          binary,
          await db.get(id, {
            ...optionsWithAttachmentAndBinaryOption,
            local_seq: true
          })
        );
      } catch {
        return {
          exists: false
        };
      }
    },
    (doc, setDoc) => {
      // Live?
      if (
        Object.keys(options).every(option =>
          ALLOWED_LIVE_OPTIONS.includes(option)
        )
      ) {
        return db::changesCache(
          {
            ...optionsWithAttachmentAndBinaryOption,
            live: true,
            include_docs: true,
            since: doc._local_seq,
            doc_ids: [id]
          },
          async ({ doc }) => setDoc(await nextState(binary, doc))
        );
      }
    }
  );
}
