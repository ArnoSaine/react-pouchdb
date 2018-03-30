import { forwardRef } from 'react';
import PouchDBModule from 'pouchdb';
import { instanceOf } from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import { Consumer } from './DBContext';

export const propTypes = {
  db: instanceOf(PouchDBModule).isRequired
};

const withDB = Component =>
  forwardRef(
    hoistStatics(
      Object.assign(
        (props, ref) => (
          <Consumer>
            {db => <Component {...props} db={db} ref={ref} />}
          </Consumer>
        ),

        {
          displayName: `withDB(${Component.displayName || Component.name})`,
          WrappedComponent: Component
        }
      ),
      Component
    )
  );

export default withDB;
