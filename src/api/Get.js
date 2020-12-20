import changes from '../changes';
import stringify from 'fast-json-stable-stringify';
import { Repeater } from '@repeaterjs/repeater';
import attachmentsAsUint8Arrays from '../attachmentsAsUint8Arrays.js';
import { useMemo } from 'react';

const UINT8ARRAY = 'u8a';
const ALLOWED_LIVE_OPTIONS = ['attachments', 'ajax', 'binary', 'id'];

async function nextState(binary, doc) {
  return binary && doc && !doc._deleted
    ? {
        ...doc,
        _attachments: await attachmentsAsUint8Arrays(doc._attachments),
      }
    : doc;
}

export const events = (options, db) =>
  new Repeater(async (push, stop) => {
    const { id, attachments, ...otherOptions } = options;
    const binary = attachments === UINT8ARRAY;
    const optionsWithAttachmentAndBinaryOption = useMemo(
      () => ({
        binary,
        ...otherOptions,
        attachments: !!attachments,
      }),
      [binary, stringify(otherOptions), !!attachments]
    );
    const changesOptions = useMemo(
      () => ({
        ...optionsWithAttachmentAndBinaryOption,
        live: true,
        include_docs: true,
        since: 'now',
        doc_ids: [id],
      }),
      [optionsWithAttachmentAndBinaryOption, id]
    );
    try {
      push(
        await nextState(
          binary,
          await db.get(id, optionsWithAttachmentAndBinaryOption)
        )
      );
    } catch (error) {
      if (error.status !== 404) {
        throw error;
      }
      push(null);
    }
    const live = Object.keys(options).every((option) =>
      ALLOWED_LIVE_OPTIONS.includes(option)
    );
    if (live) {
      const cancel = db::changes(changesOptions, async ({ doc }) => {
        push(await nextState(binary, doc));
      });
      await stop;
      cancel();
    }
  });

export const as = 'doc';
