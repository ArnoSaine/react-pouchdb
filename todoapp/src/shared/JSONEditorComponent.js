import { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

export default function JSONEditorComponent({ json, mode, onChangeJSON }) {
  const container = useRef();
  const jsoneditor = useRef();
  const onChangeJSONRef = useRef();
  useEffect(() => {
    onChangeJSONRef.current = onChangeJSON;
  }, [onChangeJSON]);
  useEffect(() => {
    jsoneditor.current = new JSONEditor(container.current, {
      mode,
      onChangeJSON: (...args) => onChangeJSONRef.current(...args),
      history: false
    });
    return () => {
      jsoneditor.current.destroy();
    };
  }, [mode]);
  useEffect(() => {
    if (jsoneditor.current.getText() !== JSON.stringify(json)) {
      jsoneditor.current.update(json);
    }
  }, [json]);
  return <div className="jsoneditor-react-container" ref={container} />;
}
