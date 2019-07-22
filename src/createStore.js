import get from '@postinumero/map-get-with-default';

export default function createStore() {
  const root = {
    children: new Map()
  };
  return (path, create) => {
    function remove({ onCleanup, value, parent }) {
      onCleanup?.(value);
      (function removeChild({ parent, children }) {
        children.delete(path.pop());
        if (!children.size && parent) {
          removeChild(parent);
        }
      })(parent);
    }
    const item = path.reduce(
      (parent, key) =>
        parent.children::get(key, () => {
          const [value, onCleanup] = create(() => remove(item));
          const item = {
            value,
            onCleanup,
            parent,
            referenceCounter: 0,
            children: new Map()
          };
          return item;
        }),
      root
    );
    item.referenceCounter = item.referenceCounter + 1;
    return [
      item.value,
      function cleanup() {
        item.referenceCounter = item.referenceCounter - 1;
        if (!item.referenceCounter) {
          remove(item);
        }
      }
    ];
  };
}
