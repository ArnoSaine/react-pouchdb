import { useCallback } from 'react';
import useHotkeys from '@reecelucas/react-use-hotkeys';
import { withRouter } from 'react-router-dom';
import { KEY } from '.';

export default (function EditModeHotkeyListener({
  history,
  location,
  children
}) {
  useHotkeys(
    'shift+e',
    useCallback(
      event => {
        event.preventDefault();
        const urlSearchParams = new URLSearchParams(location.search);
        const enabled = urlSearchParams.has(KEY);
        if (enabled) {
          urlSearchParams.delete(KEY);
        } else {
          urlSearchParams.set(KEY, '');
        }
        history.replace({ search: urlSearchParams.toString() });
      },
      [history, location.search]
    )
  );
  return null;
} |> withRouter);
