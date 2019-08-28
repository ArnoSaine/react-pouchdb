import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import replaceFirstChild from 'replaceFirstChild';
import useStateIfMounted from 'useStateIfMounted';

export default function Fallback({
  contentWrapper,
  fallback,
  overlayDelayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  },
  overlayStyle = {
    ...overlayDelayStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
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
  FallbackWrapperComponent = 'div',
  delay = 100,
  startMinDuration
}) {
  const [delayed, setDelayed] = useStateIfMounted(Boolean(delay));
  useEffect(() => {
    if (delayed) {
      const timeout = setTimeout(() => {
        if (setDelayed(false) && startMinDuration) {
          startMinDuration();
        }
      }, delay);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [delay, delayed, setDelayed, startMinDuration]);
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
        <OverlayComponent style={delayed ? overlayDelayStyle : overlayStyle}>
          {!delayed && (
            <FallbackWrapperComponent style={fallbackStyle}>
              {fallback}
            </FallbackWrapperComponent>
          )}
        </OverlayComponent>,
        document.querySelector(root)
      )}
    </>
  );
}
