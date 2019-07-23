import createStore from './createStore';

const store = createStore();

export default function changes(options, handleChange) {
  const [eventEmitter, cleanup] = store([this, options], () => {
    const eventEmitter = this.changes(options);
    return [
      eventEmitter,
      eventEmitter => {
        eventEmitter.cancel();
      }
    ];
  });
  eventEmitter.on('change', handleChange);
  return function cancel() {
    eventEmitter.removeListener('change', handleChange);
    cleanup();
  };
}
