import stringify from 'fast-json-stable-stringify';
import get from './getWithDefaultValue';

const databaseRequests = new Map();

export default function getRequest(db, options, handler) {
  const requests = databaseRequests::get(db, () => new Map());
  const optionsKey = stringify(options);
  let value = requests.get(optionsKey);
  const set = value => requests.set(optionsKey, value);

  if (!value) {
    set(
      (async () => {
        set(await handler(set));
      })()
    );
  }

  value = requests.get(optionsKey);
  if (Promise.resolve(value) === value) {
    throw value;
  }
  return {
    optionsKey,
    value,
    takeValue() {
      requests.delete(optionsKey);
      return value;
    }
  };
}
