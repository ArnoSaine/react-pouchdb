import { withRouter } from 'react-router-dom';
import InlineEditor from './InlineEditor';
import Modal from './Modal';

export default (function Editor({ id, children, history, location }) {
  return (
    <>
      <InlineEditor id={id}>{children}</InlineEditor>
      <Modal
        id={id}
        isOpen={new URLSearchParams(location.search).get('edit') === id}
        onRequestClose={() => history.replace({ ...location, search: '' })}
      />
    </>
  );
} |> withRouter);
