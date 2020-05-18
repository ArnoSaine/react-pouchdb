// import get from '@postinumero/map-get-with-default';
const get = function(key, getDefault) {
  return this.has(key)
    ? this.get(key)
    : (() => {
        const defaultValue = getDefault();
        this.set(key, defaultValue);
        return defaultValue;
      })();
};

export default function createStore() {
  const root = new Map();
  return (path, create) => {
    function remove({ onCleanup, value }) {
      onCleanup?.(value);
      let parent = root;
      const chain = path.map(key => {
        const item = { parent, key };
        parent = parent.get(key);
        return item;
      });
      (function removeChild() {
        const { parent, key } = chain.pop();
        parent.delete(key);
        if (!parent.size && chain.length) {
          removeChild();
        }
      })();
    }
    const pathCopy = [...path];
    const lastKey = pathCopy.pop();
    const leaf = pathCopy.reduce(
      (parent, key) => parent::get(key, () => new Map()),
      root
    );
    const item = leaf::get(lastKey, () => {
      const [value, onCleanup] = create(() => remove(item));
      const item = {
        value,
        onCleanup,
        referenceCounter: 0
      };
      return item;
    });
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
