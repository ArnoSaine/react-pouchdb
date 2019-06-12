import { useContext } from 'react';
import Context from './Context';

export default function useTestRender(value) {
  useContext(Context)(value);
  return value;
}
