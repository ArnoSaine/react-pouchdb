import useT from 'useT';
import { useState, useEffect } from 'react';
import { useDB, useGet } from 'react-pouchdb/browser';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import 'brace/theme/monokai';
import useHotkeys from '@reecelucas/react-use-hotkeys';
import useReset, { dbName } from '../../useReset';
import prettier from './prettier';

export default function Editor({ id, onRequestClose }) {
  const t = useT();
  const resource = useGet(dbName, { id });
  const [value, setValue] = useState(resource.element);
  const { put } = useDB(dbName);
  const save = () => {
    put({
      ...resource,
      element: prettier(value)
    });
  };
  useHotkeys('Control+s', event => {
    event.preventDefault();
    save();
    onRequestClose();
  });
  useEffect(() => setValue(resource.element), [resource]);
  const reset = useReset();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '100%'
      }}
    >
      <h2>
        {t('elementEditor')}: <code>{id}</code>
      </h2>
      <div style={{ flex: 1, marginBottom: 10 }}>
        <AceEditor
          height="100%"
          width="100%"
          mode="jsx"
          theme="monokai"
          value={value}
          onChange={value => {
            setValue(value);
          }}
          showGutter={false}
          editorProps={{ $blockScrolling: Infinity }}
        />
      </div>
      <div className="cleanslate">
        <div
          ref={el => {
            if (el) {
              el.style.setProperty('text-align', 'end', 'important');
            }
          }}
        >
          <button onClick={onRequestClose}>{t('cancel')}</button>
          <button
            onClick={() => {
              reset();
              onRequestClose();
            }}
          >
            {t('reset')}
          </button>
          <button
            onClick={() => {
              save();
              onRequestClose();
            }}
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}
