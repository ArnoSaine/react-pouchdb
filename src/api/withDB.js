import { forwardRef } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import flip from 'lodash/flip.js';

export function createWithDB(useDB) {
  return flip(function withDB(Component, db) {
    return forwardRef(
      hoistStatics(
        Object.assign(
          (props, ref) => (
            <Component
              {...props}
              db={useDB(db, {
                callee: 'withDB',
                example: 'withDB(name|options, Component)',
              })}
              ref={ref}
            />
          ),
          {
            displayName: `withDB(${Component.displayName || Component.name})`,
            WrappedComponent: Component,
          }
        ),
        Component
      )
    );
  });
}
