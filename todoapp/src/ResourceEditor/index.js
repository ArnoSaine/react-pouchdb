import { useDB, useGet } from 'react-pouchdb/browser';
import { useAddResourceBundle } from 'AddResourceBundle';
import useT from 'useT';
import Input from './Input';
import reset from '../reset';

export default function ResourceEditor() {
  const t = useT();
  const resource = useGet('translations', { id: 'en' });
  const { put } = useDB('translations');
  useAddResourceBundle(reset);
  return (
    resource && (
      <>
        <h1>{t('resourceEditorHeader')}</h1>
        <table>
          <thead>
            <tr>
              <th>{t('resourceKey')}</th>
              <th>{t('resourceValue')}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(resource.bundle)
              .filter(([key]) => !key.startsWith('_'))
              .map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    <Input
                      value={value}
                      handleSave={function handleSave(event) {
                        put({
                          ...resource,
                          bundle: {
                            ...resource.bundle,
                            [key]: event.target.value.trim()
                          }
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button onClick={() => reset(put, resource)}>
          {t('resetResource')}
        </button>
      </>
    )
  );
}
