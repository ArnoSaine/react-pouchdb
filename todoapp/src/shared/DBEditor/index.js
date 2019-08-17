import { Fragment, useState } from 'react';
import useT from 'useT';
import Editor from './Editor';

export default function DBEditor({ ids, ...props }) {
  const t = useT();
  const [id, setId] = useState(ids[0]);
  return (
    <>
      {ids.map(id => (
        <Fragment key={id}>
          <button onClick={() => setId(id)}>{t(id)}</button>{' '}
        </Fragment>
      ))}
      <Editor {...props} id={id} />
    </>
  );
}
