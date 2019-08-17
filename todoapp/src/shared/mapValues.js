export default function mapValues(callback, thisArg) {
  return Object.fromEntries(
    Object.entries(this).map(([key, value], index) => [
      key,
      thisArg::callback(value, key, index, this)
    ])
  );
}
