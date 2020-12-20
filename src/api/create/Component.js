import { Children, cloneElement, createElement } from 'react';

export default function createComponent({
  as,
  loadingState,
  name,
  useAPI,
  useDB,
}) {
  const useAPIAndMapValue = (...args) => ({ [as]: useAPI(...args) });

  const useAPIAndHandleReturnValue = loadingState
    ? loadingState === 'legacy'
      ? useAPIAndMapValue
      : useAPI
    : useAPIAndMapValue;

  return function Component({ db, children, ...otherProps }) {
    const props = {
      db: useDB(db, {
        callee: `<${name}>`,
        example: `<${name} db={name|options} ... />`,
      }),
      ...(db
        ? useAPIAndHandleReturnValue(db, otherProps)
        : useAPIAndHandleReturnValue(otherProps)),
    };

    if (typeof children === 'function') {
      return children.prototype?.isReactComponent
        ? createElement(children, props)
        : children(props);
    }

    return cloneElement(Children.only(children), props);
  };
}
