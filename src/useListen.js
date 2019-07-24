import useSubscriptionImmediateSuspense from './utils/useSubscriptionImmediateSuspense';
import createListenHook from './createListenHook';

export default createListenHook(
  (
    subscription,
    { reactPouchDBOptions: { synchronousAPIInitialSubscriptionCleanupDelay } }
  ) =>
    useSubscriptionImmediateSuspense(
      subscription,
      synchronousAPIInitialSubscriptionCleanupDelay
    )
);
