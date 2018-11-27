import { Children, cloneElement, createElement } from 'react';
import useDB from './useDB';

export default (useDBOperation, error) => ({
  db,
  children,
  component,
  render,
  ...otherProps
}) => {
  const props = {
    db: useDB(db, error)
  };
  try {
    Object.assign(
      props,
      db ? useDBOperation(db, otherProps) : useDBOperation(otherProps)
    );
  } catch (error) {
    if (component || render) {
      throw error;
    }
  }

  if (component) {
    return createElement(component, props);
  }

  if (render) {
    return render(props);
  }

  if (typeof children === 'function') {
    return children.prototype.render
      ? createElement(children, props)
      : children(props);
  }

  if (children && Children.count(children)) {
    return cloneElement(children, props);
  }
};
