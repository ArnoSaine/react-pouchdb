import over from 'lodash/over';

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
          over([...updaters])();
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
