import useResetDynamicElements, { dbName } from 'DynamicElements/useReset';
import Add from 'Add';
import elements from '../../dynamicElements';

export default function AddDynamicElements() {
  return (
    <Add useReset={useResetDynamicElements} dbName={dbName} items={elements} />
  );
}
