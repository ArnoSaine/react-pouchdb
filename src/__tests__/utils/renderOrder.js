export default (...fns) => (...args) => {
  const fn = fns.shift();
  if (!fn) {
    throw new Error('Call count exceeded.');
  }
  fn(...args);
  return null;
};
