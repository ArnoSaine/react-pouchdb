import useGetSubscription from './useGetSubscription';
import handleError from './handleError';

export default useListen => (...args) =>
  useGetSubscription(...args) |> useListen |> handleError;
