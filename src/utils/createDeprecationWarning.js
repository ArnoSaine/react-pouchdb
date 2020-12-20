export default function createDeprecationWarning(message) {
  let warned;
  return console?.warn
    ? () => {
        if (!warned) {
          warned = true;
          console.warn(message);
        }
      }
    : () => {};
}
