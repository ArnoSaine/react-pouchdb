import { useState } from 'react';
import useT from 'useT';
import Editor from './Editor';

export default function DBEditor({ translate, ids, ...props }) {
  const t = useT();
  const [id, setId] = useState(ids[0]);
  return (
    <>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <div className="cleanslate">
          {ids.map(id => (
            <button key={id} onClick={() => setId(id)}>
              {translate ? t([translate, id].join('.')) : id}
            </button>
          ))}
        </div>
      </div>
      <Editor {...props} id={id} />
    </>
  );
}
