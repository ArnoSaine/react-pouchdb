import { useContext } from 'react';
import Context from './Context';

export default function useTestRender(value) {
  useContext(Context)(
    value
      ? value
      : value === null
      ? 'null'
      : value === undefined
      ? 'undefined'
      : 'test error'
  );
  return null;
}
