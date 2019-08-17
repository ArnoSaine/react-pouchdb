import useReset from 'useReset';
import elements from '../../dynamicElements';

export default function useResetDynamicElements() {
  return useReset(dbName, elements, async element => ({
    element: (await import(`../../dynamicElements/${element}`)).default
  }));
}

export const dbName = 'elements';
