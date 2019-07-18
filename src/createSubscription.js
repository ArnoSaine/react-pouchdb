export default function createSubscription(subscribe, remove) {
  let value;
  let unsubscribe;
  const updaters = new Set();

  return {
    getCurrentValue: () => value,
    subscribe: update => {
      if (!updaters.size) {
        unsubscribe = subscribe(nextValue => {
          value = [null, nextValue];
          updaters.forEach(update => update());
        });
      }
      updaters.add(update);
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
