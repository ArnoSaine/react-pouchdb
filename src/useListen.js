import { useSubscription } from './packages/use-subscription';
import createListenHook from './createListenHook';

export default createListenHook(
  (
    subscription,
    { reactPouchDBOptions: { synchronousAPIInitialSubscriptionCleanupDelay } }
  ) => {
    if (!subscription.getCurrentValue()) {
      throw new Promise(resolve => {
        const unsubscribe = subscription.subscribe(resolve);
        setTimeout(unsubscribe, synchronousAPIInitialSubscriptionCleanupDelay);
      });
    }
    return useSubscription(subscription);
  }
);
