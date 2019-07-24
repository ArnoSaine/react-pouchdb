export default fn =>
  function reverseArgs(...args) {
    return this::fn(...args.reverse());
  };
