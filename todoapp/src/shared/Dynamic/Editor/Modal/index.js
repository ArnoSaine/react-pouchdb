import { lazy, useRef } from 'react';
import { withRouter } from 'react-router-dom';

const Modal = lazy(() => import('./Modal'));

export const KEY = 'edit';

export default (function Editor({ history, location }) {
  const urlSearchParams = new URLSearchParams(location.search);
  const id = urlSearchParams.get(KEY);
  const isOpen = Boolean(id);
  const isOpened = useRef(isOpen);
  if (!isOpened.current) {
    if (isOpen) {
      isOpened.current = true;
    }
  }
  return isOpened.current ? (
    <Modal
      id={id}
      isOpen={isOpen}
      onRequestClose={() => {
        urlSearchParams.delete(KEY);
        history.replace({ search: urlSearchParams.toString() });
      }}
    />
  ) : null;
} |> withRouter);
