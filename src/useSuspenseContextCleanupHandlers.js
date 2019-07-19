import React, { useContext, useMemo, createContext, useEffect } from 'react';
import over from 'lodash/over';

const { Suspense } = React;

const Context = createContext();

// Dangerously overwrite React.Suspense.
// Wrap original Suspense with a context provider.
// Context value is a set of callbacks.
// Each callback is invoked when Suspense component unmounts.
React.Suspense = function ReactPouchDBSuspenseCleanupContext(props) {
  const handlers = useMemo(() => new Set(), []);
  useEffect(() => over([...handlers]), []);
  return (
    <Context.Provider value={handlers}>
      <Suspense {...props} />
    </Context.Provider>
  );
};

export default function useSuspenseContextCleanupHandlers() {
  return useContext(Context);
}
