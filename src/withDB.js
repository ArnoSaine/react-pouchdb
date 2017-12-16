import { func } from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import { contextTypes } from './PouchDB';

const withDB = Component =>
  hoistStatics(
    Object.assign(
      (props, context) => {
        const { wrappedComponentRef, ...remainingProps } = props;
        return (
          <Component
            {...remainingProps}
            {...context}
            ref={wrappedComponentRef}
          />
        );
      },
      {
        displayName: `withDB(${Component.displayName || Component.name})`,
        WrappedComponent: Component,
        propTypes: {
          wrappedComponentRef: func
        },
        contextTypes
      }
    ),
    Component
  );

export default withDB;
