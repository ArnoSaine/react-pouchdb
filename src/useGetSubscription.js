import { useMemo } from 'react';
import stringify from 'fast-json-stable-stringify';
import getSubscription from './getSubscription';

export default function useGetSubscription(db, options, subscribe) {
  const key = stringify(options);
  return useMemo(() => getSubscription(db, key, subscribe), [
    getSubscription,
    db,
    key,
    subscribe
  ]);
}
