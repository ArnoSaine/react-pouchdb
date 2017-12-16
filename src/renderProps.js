import { Children, cloneElement, createElement } from 'react';
import { func, element, oneOfType } from 'prop-types';
import lodashOmit from 'lodash/omit';

export const propTypes = {
  children: oneOfType([element, func]),
  component: func,
  render: func
};
const propNames = Object.keys(propTypes);

export default ({ children, component, render }, ready, props) => {
  if (component) {
    return ready ? createElement(component, props) : null;
  }

  if (render) {
    return ready ? render(props) : null;
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
