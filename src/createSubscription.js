export default function createSubscription(subscribe, remove) {
  let value;
  let subscribing;
  const updaters = new Set();
  return {
    getCurrentValue: () => value,
    subscribe: update => {
      updaters.add(update);
      if (updaters.size === 1) {
        subscribing = (async () => {
          try {
            return await subscribe(nextValue => {
              value = [null, nextValue];
              updaters.forEach(updater => updater());
            });
          } catch (error) {
            value = [error];
            updaters.forEach(updater => updater());
          }
        })();
      }

      return async () => {
        updaters.delete(update);
        if (!updaters.size) {
          remove();
          const unsubscribe = await subscribing;
          unsubscribe?.();
        }
      };
    }
  };
}
