import { lazy } from 'react';
import ReactModal from 'react-modal';

const Editor = lazy(() => import('./Editor'));

ReactModal.setAppElement('#root');

export default function Modal({ isOpen, onRequestClose, id }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        onRequestClose();
      }}
      style={{
        overlay: { zIndex: 100 },
        content: {
          width: 560,
          height: 440,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
    >
      {id && isOpen ? <Editor id={id} onRequestClose={onRequestClose} /> : null}
    </ReactModal>
  );
}
