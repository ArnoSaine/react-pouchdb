import { Children, cloneElement, createElement } from 'react';
import useDB from './useDB';

export default (valueToProps, error) => useAPI => {
  const useAPIAndHandleReturnValue = (...args) =>
    useAPI(...args) |> valueToProps;

  return function useRenderProps({ db, children, ...otherProps }) {
    const props = {
      db: useDB(db, error)
    };

    Object.assign(
      props,
      db
        ? useAPIAndHandleReturnValue(db, otherProps)
        : useAPIAndHandleReturnValue(otherProps)
    );

    if (typeof children === 'function') {
      return children.prototype?.render
        ? createElement(children, props)
        : children(props);
    }

    return cloneElement(Children.only(children), props);
  };
};
