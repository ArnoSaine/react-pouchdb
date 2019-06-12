import { useCallback, useMemo, useState } from 'react';
import Context from './Context';

export default function Test({ message, test, children }) {
  const [actual, setActual] = useState([]);

  return (
    <Context.Provider
      value={useCallback(value => setActual(actual => [...actual, value]), [])}
    >
      <h3>{message}</h3>
      <pre>
        {JSON.stringify(
          useMemo(() => {
            try {
              test(actual);
              return 'ok';
            } catch ({ name, message, generatedMessage, ...other }) {
              return other;
            }
          }, [actual, test]),
          null,
          2
        )}
      </pre>
      {children}
    </Context.Provider>
  );
}

export ErrorBoundaryAndSuspenseOrder from './ErrorBoundaryAndSuspenseOrder';
export useTestRender from './useTestRender';
