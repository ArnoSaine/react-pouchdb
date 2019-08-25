import { withRouter } from 'react-router-dom';
import InlineEditor from './InlineEditor';
import Modal from './Modal';

export const KEY = 'edit';

export default (function Editor({ id, children, history, location }) {
  const urlSearchParams = new URLSearchParams(location.search);
  return (
    <>
      <InlineEditor id={id}>{children}</InlineEditor>
      <Modal
        id={id}
        isOpen={urlSearchParams.get(KEY) === id}
        onRequestClose={() => {
          urlSearchParams.delete(KEY);
          history.replace({ search: urlSearchParams.toString() });
        }}
      />
    </>
  );
} |> withRouter);
