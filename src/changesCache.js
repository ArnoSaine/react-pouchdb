import stringify from 'fast-json-stable-stringify';
import get from './getWithDefaultValue';

export const cache = new Map();

const EVENT = 'change';

export default function changesCache(options, handleChange) {
  const dbCache = cache::get(this, () => new Map());
  const key = stringify(options);
  const listener = dbCache::get(key, () => ({
    eventEmitter: this.changes(options),
    count: 0
  }));
  const { eventEmitter } = listener;
  listener.count = listener.count + 1;
  eventEmitter.on(EVENT, handleChange);
  return function cancel() {
    listener.count = listener.count - 1;
    if (listener.count) {
      eventEmitter.removeListener(EVENT, handleChange);
    } else {
      eventEmitter.cancel();
      dbCache.delete(key);
    }
  };
}
