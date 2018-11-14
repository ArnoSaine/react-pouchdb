import { useEffect } from 'react';
import attachmentsAsUint8Arrays from './attachmentsAsUint8Arrays';
import changesCache from './changesCache';
import useStateIfMounted from './useStateIfMounted';
import useDB from './useDB';
import getRequest from './getRequest';

const UINT8ARRAY = 'u8a';
const ALLOWED_LIVE_OPTIONS = ['attachments', 'ajax', 'binary', 'id'];

export default function useGet(db, options = db) {
  async function nextState(doc) {
    return {
      attachments:
        options.attachments === UINT8ARRAY
          ? await attachmentsAsUint8Arrays(doc._attachments)
          : doc._attachments,
      doc,
      exists: !doc._deleted
    };
  }

  const { id, attachments, ...otherOptions } = options;
  const optionsWithAttachmentAndBinaryOption = {
    binary: attachments === UINT8ARRAY,
    ...otherOptions,
    attachments: !!attachments
  };
  db =
    useDB({
      callee: 'useGet',
      example: 'useGet(db, options)',
      test: arguments.length === 1
    }) ?? db;
  const { optionsKey, value } = getRequest(db, options, async () => {
    try {
      return await nextState(
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
  });

  const [doc, setDoc] = useStateIfMounted(value);
  useEffect(
    () => {
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
          async ({ doc }) => setDoc(await nextState(doc))
        );
      }
    },
    [db, optionsKey]
  );
  return doc;
}
