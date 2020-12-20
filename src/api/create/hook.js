import flip from 'lodash/flip.js';
import stringify from 'fast-json-stable-stringify';

const optionsUseAsync = {
  normalizer: ([options, db]) => [stringify(options), db],
};

export default function createHook({
  as,
  useAsync,
  events,
  loadingState,
  name,
  useDB,
}) {
  const useAsyncAndHandleReturnValue = loadingState
    ? loadingState === 'legacy'
      ? (...args) => {
          const { isLoading, data } = useAsync(...args);
          return isLoading ? undefined : data;
        }
      : (...args) => {
          const { data, ...other } = useAsync(...args);
          return { [as]: data, ...other };
        }
    : useAsync;

  return flip((options, db) => {
    db = useDB(db, {
      callee: name,
      example: `${name}(db, options)`,
    });
    return useAsyncAndHandleReturnValue(events, optionsUseAsync, [options, db]);
  });
}
