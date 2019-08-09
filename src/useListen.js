import useSubscriptionImmediateSuspense from './utils/useSubscriptionImmediateSuspense';
import createListenHook from './createListenHook';

export default createListenHook(
  (
    subscription,
    { reactPouchDBOptions: { synchronousAPITemporarySubscriptionCleanupDelay } }
  ) =>
    useSubscriptionImmediateSuspense(
      subscription,
      synchronousAPITemporarySubscriptionCleanupDelay
    )
);
