import * as react from 'react';

export const compose = ({
  useEffect = react.useEffect,
  useRef = react.useRef,
  useState = react.useState
} = {}) =>
  function useStateIfMounted(...args) {
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
  };

export default compose();
