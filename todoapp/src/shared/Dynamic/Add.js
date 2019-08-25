import useReset, { dbName } from './useReset';
import Add from 'Add';
import elements from '../../dynamicElements';

export default function AddDynamicElements() {
  return <Add useReset={useReset} dbName={dbName} items={elements} />;
}
