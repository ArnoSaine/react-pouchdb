import { createPortal } from 'react-dom';
import replaceFirstChild from 'replaceFirstChild';

export default function Fallback({
  contentWrapper,
  fallback,
  overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1000
  },
  fallbackStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  root = '#root',
  WrapperComponent,
  OverlayComponent = 'div',
  FallbackWrapperComponent = 'div'
}) {
  return (
    <>
      <WrapperComponent
        ref={
          contentWrapper.current &&
          (elem => {
            if (elem) {
              const clone = contentWrapper.current.cloneNode(true);
              clone.style.removeProperty('display');
              elem::replaceFirstChild(clone);
            }
          })
        }
      />
      {createPortal(
        <OverlayComponent style={overlayStyle}>
          <FallbackWrapperComponent style={fallbackStyle}>
            {fallback}
          </FallbackWrapperComponent>
        </OverlayComponent>,
        document.querySelector(root)
      )}
    </>
  );
}
