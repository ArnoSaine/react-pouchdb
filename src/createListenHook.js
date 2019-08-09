import { useCallback } from 'react';
import handleError from './handleError';
import useGetSubscription from './useGetSubscription';
import debounceSetValue from './debounceSetValue';

export default useListen => (db, options, subscribe) =>
  useGetSubscription(
    db,
    options,
    useCallback(setValue => setValue |> debounceSetValue(db) |> subscribe, [
      db,
      subscribe
    ])
  )
  |> (subscription => useListen(subscription, db))
  |> handleError;
