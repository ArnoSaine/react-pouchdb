import { forwardRef, useImperativeHandle, useState } from 'react';

export default forwardRef(function MinDurationHandler(
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
