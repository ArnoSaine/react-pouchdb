import { useCallback } from 'react';
import { useDB, useGet } from 'react-pouchdb/browser';
import { useAddResourceBundle } from 'AddResourceBundle';
import useT from 'useT';
import JSONEditorComponent from 'JSONEditorComponent';
import reset from '../reset';

export default function ResourceEditor() {
  const t = useT();
  const resource = useGet('translations', { id: 'en' });
  const { put } = useDB('translations');
  useAddResourceBundle(reset);
  const onChangeJSON = useCallback(
    bundle => {
      put({
        ...resource,
        bundle
      });
    },
    [put, resource]
  );
  return (
    resource && (
      <>
        <h1>{t('resourceEditorHeader')}</h1>
        <JSONEditorComponent
          json={resource.bundle}
          onChangeJSON={onChangeJSON}
        />
        <button onClick={() => reset(put, resource)}>
          {t('resetResource')}
        </button>
      </>
    )
  );
}
