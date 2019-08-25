import { createContext, useCallback, useContext, useState } from 'react';
import useHotkeys from '@reecelucas/react-use-hotkeys';
import { withRouter } from 'react-router-dom';

const Context = createContext();

export const useIsEnabled = () => useContext(Context);

export const EditModeContext =
  function EditModeContext({ location, children }) {
    const [enabled, setEnabled] = useState(
      Boolean(new URLSearchParams(location.search).get('edit'))
    );
    useHotkeys(
      'shift+e',
      useCallback(event => {
        event.preventDefault();
        setEnabled(enabled => !enabled);
      }, [])
    );
    return <Context.Provider value={enabled}>{children}</Context.Provider>;
  } |> withRouter;
