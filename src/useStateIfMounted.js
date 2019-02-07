import { useEffect, useRef, useState } from 'react';

export default function useStateIfMounted(...args) {
  const isMountRef = useRef();
  const [value, setValue] = useState(...args);
  useEffect(() => {
    isMountRef.current = true;
    return () => {
      isMountRef.current = false;
    };
  });
  return [
    value,
    value => {
      if (isMountRef.current) {
        setValue(value);
      }
      return isMountRef.current;
    }
  ];
}
