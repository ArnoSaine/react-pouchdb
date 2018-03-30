import PouchDBModule from 'pouchdb';
import { instanceOf, func } from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import { Consumer } from './DBContext';

export const propTypes = {
  db: instanceOf(PouchDBModule).isRequired
};

const withDB = Component =>
  hoistStatics(
    Object.assign(
      props => {
        const { wrappedComponentRef, ...remainingProps } = props;
        return (
          <Consumer>
            {db => (
              <Component
                {...remainingProps}
                db={db}
                ref={wrappedComponentRef}
              />
            )}
          </Consumer>
        );
      },
      {
        displayName: `withDB(${Component.displayName || Component.name})`,
        WrappedComponent: Component,
        propTypes: {
          wrappedComponentRef: func
        }
      }
    ),
    Component
  );

export default withDB;
