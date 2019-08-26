import { Suspense, useRef } from 'react';
import Fallback from './Fallback';

export default function SuspenseOverlay({
  children,
  WrapperComponent = 'div',
  ...otherProps
}) {
  const wrapper = useRef();
  return (
    <Suspense
      fallback={
        <Fallback
          contentWrapper={wrapper}
          WrapperComponent={WrapperComponent}
          {...otherProps}
        />
      }
    >
      <WrapperComponent ref={wrapper}>{children}</WrapperComponent>
    </Suspense>
  );
}
