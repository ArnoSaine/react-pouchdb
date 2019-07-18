import useSuspenseContextCleanupHandlers from './useSuspenseContextCleanupHandlers';
import { useSubscription } from './packages/use-subscription';
import createListenHook from './createListenHook';

export default createListenHook(subscription => {
  const suspenseContextCleanupHandlers = useSuspenseContextCleanupHandlers();
  if (!subscription.getCurrentValue()) {
    throw new Promise(async resolve => {
      let unsubscribe;
      const gettingInitialValue = new Promise(resolve => {
        unsubscribe = subscription.subscribe(resolve);
      });
      async function cleanup() {
        await gettingInitialValue;
        if (unsubscribe) {
          unsubscribe();
        }
      }
      suspenseContextCleanupHandlers.add(cleanup);
      await gettingInitialValue;
      suspenseContextCleanupHandlers.delete(cleanup);
      resolve();
    });
  }
  return useSubscription(subscription);
});
