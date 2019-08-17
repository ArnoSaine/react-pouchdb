import { Fragment, useState } from 'react';
import useT from 'useT';
import Editor from './Editor';

export default function DBEditor({ translate, ids, ...props }) {
  const t = useT();
  const [id, setId] = useState(ids[0]);
  return (
    <>
      {ids.map(id => (
        <Fragment key={id}>
          <button onClick={() => setId(id)}>{translate ? t(id) : id}</button>{' '}
        </Fragment>
      ))}
      <Editor {...props} id={id} />
    </>
  );
}
