import { Suspense, useRef } from 'react';
import Fallback from './Fallback';
import MinDurationHandler from './MinDurationHandler';

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
