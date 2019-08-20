import { Fragment, useState, useEffect } from 'react';
import useT from 'useT';
import { useDB, useGet } from 'react-pouchdb/browser';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import 'brace/theme/monokai';
import useHotkeys from 'react-use-hotkeys';
import useResetDynamicElements, { dbName } from 'DynamicElements/useReset';
import elements from '../../dynamicElements';
import prettier from './prettier';

export default function ElementEditor() {
  const [id, setId] = useState(elements[0]);
  return (
    <>
      {elements.map(id => (
        <Fragment key={id}>
          <button onClick={() => setId(id)}>{id}</button>{' '}
        </Fragment>
      ))}
      <Editor id={id} />
    </>
  );
}

function Editor({ id }) {
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
  });
  useEffect(() => setValue(resource.element), [resource]);
  const reset = useResetDynamicElements();
  return (
    resource && (
      <>
        <AceEditor
          mode="jsx"
          theme="monokai"
          value={value}
          onChange={value => {
            setValue(value);
          }}
          onBlur={save}
          showGutter={false}
          editorProps={{ $blockScrolling: Infinity }}
        />
        <button onClick={reset}>{t('reset')}</button>
      </>
    )
  );
}
