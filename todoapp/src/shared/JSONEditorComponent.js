import { useCallback, useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

export default function JSONEditorComponent({
  json,
  mode,
  onChangeJSON: onChange
}) {
  const container = useRef();
  const jsoneditor = useRef();
  const ref = useRef();
  useEffect(() => {
    ref.current = onChange;
  }, [onChange]);
  const onChangeJSON = useCallback((...args) => ref.current(...args), [ref]);
  useEffect(() => {
    jsoneditor.current = new JSONEditor(container.current, {
      mode,
      onChangeJSON
    });
    return () => {
      jsoneditor.current.destroy();
    };
  }, [mode, onChangeJSON]);
  useEffect(() => {
    if (jsoneditor.current.getText() !== JSON.stringify(json)) {
      jsoneditor.current.update(json);
    }
  }, [json]);
  return <div className="jsoneditor-react-container" ref={container} />;
}
