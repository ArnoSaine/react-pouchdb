import { Suspense, useRef } from 'react';
import Fallback from './Fallback';
import MinDurationHandler from './MinDurationHandler';

export default function SuspenseOverlay({
  ContainerComponent = 'div',
  WrapperComponent = 'div',
  children,
  contained,
  containerStyle = { position: 'relative' },
  minDuration = 500,
  ...otherProps
}) {
  const contentRef = useRef();
  const minDurationHandler = useRef();
  const suspense = (
    <Suspense
      fallback={
        <Fallback
          startMinDuration={minDurationHandler.current?.startMinDuration}
          contentRef={contentRef}
          WrapperComponent={WrapperComponent}
          contained={contained}
          {...otherProps}
        />
      }
    >
      <MinDurationHandler ref={minDurationHandler} minDuration={minDuration}>
        <WrapperComponent ref={contentRef}>{children}</WrapperComponent>
      </MinDurationHandler>
    </Suspense>
  );
  return contained ? (
    <ContainerComponent style={containerStyle}>{suspense}</ContainerComponent>
  ) : (
    suspense
  );
}
