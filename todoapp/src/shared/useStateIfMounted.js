import { useCallback, useEffect, useRef, useState } from 'react';

export default function useStateIfMounted(...args) {
  const isMountedRef = useRef();
  const [value, setValue] = useState(...args);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return [
    value,
    useCallback(value => {
      if (isMountedRef.current) {
        setValue(value);
      }
      return isMountedRef.current;
    }, [])
  ];
}
