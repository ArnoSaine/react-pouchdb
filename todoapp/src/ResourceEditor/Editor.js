import { useCallback } from 'react';
import { useDB, useGet } from 'react-pouchdb/browser';
import useT from 'useT';
import JSONEditorComponent from 'JSONEditorComponent';
import useResetResourceBundle, { dbName } from 'useResetResourceBundle';

export default function Editor({ lng }) {
  const t = useT();
  const resource = useGet(dbName, { id: lng });
  const { put } = useDB(dbName);
  const onChangeJSON = useCallback(
    bundle => {
      put({
        ...resource,
        bundle
      });
    },
    [put, resource]
  );
  const reset = useResetResourceBundle();
  return (
    resource && (
      <>
        <h1>{t('resourceEditorHeader')}</h1>
        <JSONEditorComponent
          json={resource.bundle}
          onChangeJSON={onChangeJSON}
        />
        <button onClick={reset}>{t('resetResource')}</button>
      </>
    )
  );
}
