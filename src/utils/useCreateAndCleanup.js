import { useMemo, useEffect } from 'react';

export default function useCreateAndCleanup(create, cleanup, dependencies) {
  useEffect(() => cleanup, dependencies);
  return useMemo(create, dependencies);
}
