import { forwardRef } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import useDB from './useDB';

export default function withDB(db, Component = db) {
  if (arguments.length < 2) {
    db = undefined;
  }
  return forwardRef(
    hoistStatics(
      Object.assign(
        (props, ref) => (
          <Component
            {...props}
            db={useDB(db, {
              callee: 'withDB',
              example: 'withDB(name|options, Component)'
            })}
            ref={ref}
          />
        ),
        {
          displayName: `withDB(${Component.displayName || Component.name})`,
          WrappedComponent: Component
        }
      ),
      Component
    )
  );
}
