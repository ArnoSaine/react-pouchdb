import { Provider } from './DBContext';
import { useDBOptions } from './useDB';

export default function PouchDB({ children, ...options }) {
  return <Provider value={useDBOptions(options)}>{children}</Provider>;
}
