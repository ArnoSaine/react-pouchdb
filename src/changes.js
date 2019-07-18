export default function changes(options, handleChange) {
  const eventEmitter = this.changes(options);
  eventEmitter.on('change', handleChange);
  return function cancel() {
    eventEmitter.cancel();
  };
}
