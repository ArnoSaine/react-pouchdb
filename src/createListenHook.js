import useGetSubscription from './useGetSubscription';
import handleError from './handleError';

export default useListen => (db, options, subscribe) =>
  useGetSubscription(db, options, subscribe)
  |> (subscription => useListen(subscription, db))
  |> handleError;
