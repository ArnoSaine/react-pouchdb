import { useSubscription } from 'use-subscription';

// Like use-subscription, but if current value is undefined, this will suspend immediately until value is received.
// Initial subscription is closed after cleanupDelay. Component should have mounted (and subscribed) by then or process is repeated indefinitely.
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
