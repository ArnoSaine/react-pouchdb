import { useCallback } from 'react';
import { useDB } from 'react-pouchdb/browser';
import { availableLanguages } from '../i18n';

export default function useResetResourceBundle() {
  const { allDocs, bulkDocs } = useDB(dbName);
  return useCallback(async () => {
    const { rows } = await allDocs();
    bulkDocs({
      docs: await Promise.all(
        availableLanguages.map(async lng => ({
          _id: lng,
          _rev: rows.find(({ id }) => id === lng)?.value.rev,
          bundle: (await import(`../i18n/resources/${lng}`)).default
        }))
      )
    });
  }, [allDocs, bulkDocs]);
}

export const dbName = 'translations';
