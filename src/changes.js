import memoize from 'memoizee';
import stringify from 'fast-json-stable-stringify';
import processQueue from './utils/processQueue.js';

const eventEmitterMemoized = memoize((options, db) => db.changes(options), {
  refCounter: true,
  dispose(eventEmitter) {
    eventEmitter.cancel();
  },
  normalizer: ([options, db]) => [stringify(options), db],
});

export default function changes(options, handleChange) {
  const eventEmitter = eventEmitterMemoized(options, this);
  const handleChangeQueued = processQueue(handleChange);
  eventEmitter.on('change', handleChangeQueued);
  return function cleanup() {
    eventEmitter.removeListener('change', handleChangeQueued);
    eventEmitterMemoized.deleteRef(options, this);
  };
}
