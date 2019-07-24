import { useSubscription } from '../packages/use-subscription';

// Like use-subscription, but if current value is undefined, this will suspend immediately until value is received.
// After cleanupDelay, initial subscription is closed. Component should have mounted (and subscribed) by then or process is repeated indefinitely.
export default function useSubscriptionImmediateSuspense(
  subscription,
  cleanupDelay = 30000
) {
  if (!subscription.getCurrentValue()) {
    throw new Promise(resolve => {
      const unsubscribe = subscription.subscribe(resolve);
      setTimeout(unsubscribe, cleanupDelay);
    });
  }
  return useSubscription(subscription);
}
