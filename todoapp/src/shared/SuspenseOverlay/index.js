import {
  Suspense,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import Fallback from './Fallback';

export default function SuspenseOverlay({
  children,
  WrapperComponent = 'div',
  minDuration = 500,
  ...otherProps
}) {
  const wrapper = useRef();
  const minDurationHandler = useRef();
  return (
    <Suspense
      fallback={
        <Fallback
          startMinDuration={minDurationHandler.current?.startMinDuration}
          contentWrapper={wrapper}
          WrapperComponent={WrapperComponent}
          {...otherProps}
        />
      }
    >
      <MinDurationHandler ref={minDurationHandler} minDuration={minDuration}>
        <WrapperComponent ref={wrapper}>{children}</WrapperComponent>
      </MinDurationHandler>
    </Suspense>
  );
}

const MinDurationHandler = forwardRef(function MinDurationHandler(
  { minDuration, children },
  ref
) {
  const [suspend, setSuspend] = useState();
  useImperativeHandle(ref, () => ({
    startMinDuration: minDuration
      ? () => {
          setSuspend(true);
        }
      : undefined
  }));
  if (suspend) {
    throw new Promise(resolve =>
      setTimeout(() => {
        setSuspend(false);
        resolve();
      }, minDuration)
    );
  }
  return children;
});
