import { Children, cloneElement, createElement } from 'react';
import { func, element, oneOfType } from 'prop-types';
import lodashOmit from 'lodash/omit';
import useDB from './useDB';

export const propTypes = {
  children: oneOfType([element, func]),
  component: func,
  render: func
};
const propNames = Object.keys(propTypes);

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

export const omit = props => lodashOmit(props, propNames);
