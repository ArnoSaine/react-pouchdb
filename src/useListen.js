import { useEffect } from 'react';
import stringify from 'fast-json-stable-stringify';
import getWithDefaultValue from '@postinumero/map-get-with-default';
import useStateIfMounted from './useStateIfMounted';

const databaseRequests = new Map();

class Request {
  constructor({ optionsKey, requests }) {
    this.requests = requests;
    this.optionsKey = optionsKey;
  }

  #listenerCount = 0;

  removeRequestIfNoListeners = () => {
    if (!this.#listenerCount) {
      this.requests.delete(this.optionsKey);
    }
  };

  resetCleanupTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.removeRequestIfNoListeners, 10000);
  }

  increaseListenerCount() {
    this.#listenerCount = this.#listenerCount + 1;
  }

  decreaseListenerCount() {
    this.#listenerCount = this.#listenerCount - 1;
    this.removeRequestIfNoListeners();
  }
}

export default function useListen(db, options, get, listener) {
  const requests = databaseRequests::getWithDefaultValue(db, () => new Map());
  const optionsKey = stringify(options);
  const request = requests::getWithDefaultValue(
    optionsKey,
    () => new Request({ optionsKey, requests })
  );

  if (!('value' in request)) {
    request.value = (async () => {
      try {
        request.value = await get();
      } catch (error) {
        request.value = undefined;
        throw error;
      }
    })();
  }

  const { value } = request;

  if (Promise.resolve(value) === value) {
    request.resetCleanupTimer();
    throw value;
  }

  const [_, setState] = useStateIfMounted();

  useEffect(() => {
    request.increaseListenerCount();
    const cancel = listener(value, value => {
      request.value = value;
      setState(value);
    });
    return () => {
      request.decreaseListenerCount();
      cancel();
    };
  }, [db, optionsKey]);

  return value;
}
