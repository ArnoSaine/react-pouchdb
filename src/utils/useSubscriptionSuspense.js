import { useRef, useEffect, useCallback } from 'react';
import { useSubscription } from 'use-subscription';

// Like use-subscription, but if current value is undefined, this will return undefined, and suspend right after first render until value is received.
export default function useSubscriptionSuspense(subscription) {
  const initializing = useRef(true);
  const suspender = useRef();
  useEffect(() => {
    initializing.current = false;
  }, []);
  return useSubscription({
    ...subscription,
    getCurrentValue: useCallback(() => {
      const value = subscription.getCurrentValue();
      if (value !== undefined) {
        return value;
      }
      if (!suspender.current) {
        suspender.current = new Promise(resolve => {
          const unsubscribe = subscription.subscribe(
            function checkForUpdates() {
              resolve();
              unsubscribe();
            }
          );
        });
      }
      if (initializing.current) {
        return;
      }
      throw suspender.current;
    }, [subscription])
  });
}
