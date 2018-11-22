import attachmentsAsUint8Arrays from './attachmentsAsUint8Arrays';
import changesCache from './changesCache';
import useDB from './useDB';
import useListen from './useListen';

const UINT8ARRAY = 'u8a';
const ALLOWED_LIVE_OPTIONS = ['attachments', 'ajax', 'binary', 'id'];

async function nextState(binary, doc) {
  return binary && doc
    ? {
        ...doc,
        _attachments: await attachmentsAsUint8Arrays(doc._attachments)
      }
    : doc;
}

export default function useGet(db, options = db) {
  if (arguments.length < 2) {
    db = undefined;
  }
  db = useDB(db, {
    callee: 'useGet',
    example: 'useGet(db, options)'
  });
  const { id, attachments, ...otherOptions } = options;
  const binary = attachments === UINT8ARRAY;
  const optionsWithAttachmentAndBinaryOption = {
    binary,
    ...otherOptions,
    attachments: !!attachments
  };
  return useListen(
    db,
    options,
    async () => {
      let doc;
      try {
        doc = await db.get(id, {
          ...optionsWithAttachmentAndBinaryOption,
          local_seq: true
        });
      } catch {}
      return nextState(binary, doc);
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
            since: doc?._local_seq,
            doc_ids: [id]
          },
          async ({ doc }) => setDoc(await nextState(binary, doc))
        );
      }
    }
  );
}
