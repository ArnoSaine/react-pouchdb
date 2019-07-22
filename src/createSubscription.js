export default function createSubscription(subscribe, remove) {
  let value;
  let unsubscribe;
  const updaters = new Set();

  return {
    getCurrentValue: () => value,
    subscribe: update => {
      (async () => {
        updaters.add(update);
        if (updaters.size === 1) {
          try {
            unsubscribe = await subscribe(nextValue => {
              value = [null, nextValue];
              updaters.forEach(updater => updater());
            });
          } catch (error) {
            value = [error];
            updaters.forEach(updater => updater());
          }
        }
      })();

      return () => {
        updaters.delete(update);
        if (!updaters.size) {
          remove();
          unsubscribe?.();
        }
      };
    }
  };
}
