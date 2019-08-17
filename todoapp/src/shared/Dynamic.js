import { Children, Fragment, createElement } from 'react';
import mapValues from 'mapValues';
import useT from 'useT';
import { useGet } from 'react-pouchdb/browser';
import { dbName } from 'DynamicElements/useReset';
import * as componentCatalog from '../componentCatalog';

const components = {
  Fragment,
  Dynamic,
  ...componentCatalog
};

export default function Dynamic({ id, ...otherProps }) {
  const { element } = useGet(dbName, { id });
  const t = useT();
  return (function element({ type, props = null, children }) {
    function escape(value, key) {
      return Array.isArray(value)
        ? do {
            const [option, ...params] = value;
            Array.isArray(option)
              ? option.map(escape)
              : {
                  element,
                  prop(name) {
                    return otherProps[name ?? key];
                  },
                  trans(name) {
                    return t(name ?? key);
                  }
                }[option](...params);
          }
        : value;
    }
    const startsWith = type[0];
    return createElement(
      startsWith === startsWith.toUpperCase() ? components[type] : type,
      props && props::mapValues(escape),
      ...(children ? Children.map(escape(children, 'children'), x => x) : [])
    );
  })(element);
}
