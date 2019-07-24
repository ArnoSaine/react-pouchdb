import { forwardRef } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import reverseArgs from './utils/reverseArgs';
import useDB from './useDB';

export default reverseArgs(function withDB(Component, db) {
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
});
