import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import replaceFirstChild from 'replaceFirstChild';
import useStateIfMounted from 'useStateIfMounted';

export default function Fallback({
  contentRef,
  fallback,
  overlayDelayBaseStyle = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  },
  backgroundColor = 'rgba(255, 255, 255, 0.5)',
  overlayBaseStyle = {
    backgroundColor,
    boxShadow: `0px 0px 4px ${backgroundColor}`
  },
  overlayDelayStyle = {
    ...overlayDelayBaseStyle,
    position: 'fixed'
  },
  overlayStyle = {
    ...overlayDelayStyle,
    ...overlayBaseStyle
  },
  containedOverlayDelayStyle = {
    ...overlayDelayBaseStyle,
    position: 'absolute'
  },
  containedOverlayStyle = {
    ...containedOverlayDelayStyle,
    ...overlayBaseStyle
  },
  fallbackStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  wrapperStyleOnOverlay = {
    filter: 'blur(4px)'
  },
  root = '#root',
  WrapperComponent,
  OverlayComponent = 'div',
  FallbackWrapperComponent = 'div',
  delay = 100,
  startMinDuration,
  contained
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
  const overlay = (
    <OverlayComponent
      style={
        contained
          ? delayed
            ? containedOverlayDelayStyle
            : containedOverlayStyle
          : delayed
          ? overlayDelayStyle
          : overlayStyle
      }
    >
      {!delayed && (
        <FallbackWrapperComponent style={fallbackStyle}>
          {fallback}
        </FallbackWrapperComponent>
      )}
    </OverlayComponent>
  );
  return (
    <>
      <WrapperComponent
        style={delayed ? undefined : wrapperStyleOnOverlay}
        ref={
          contentRef.current &&
          (elem => {
            if (elem) {
              const clone = contentRef.current.cloneNode(true);
              clone.style.removeProperty('display');
              elem::replaceFirstChild(clone);
            }
          })
        }
      />
      {contained
        ? overlay
        : createPortal(overlay, document.querySelector(root))}
    </>
  );
}
