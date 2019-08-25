import useT from 'useT';
import { withRouter } from 'react-router-dom';

export const KEY = 'edit';

export default (function Editor({ enabled, id, children, history, location }) {
  const t = useT();
  const urlSearchParams = new URLSearchParams(location.search);
  return (
    <>
      {urlSearchParams.has(KEY) && (
        <span style={{ position: 'relative' }}>
          <span
            role="img"
            aria-label={t('edit')}
            style={{
              top: 0,
              right: 0,
              zIndex: 1,
              position: 'absolute',
              transform: 'scale(1) translate(50%, -50%)',
              boxSizing: 'border-box',
              cursor: 'pointer'
            }}
            onClick={() => {
              urlSearchParams.set(KEY, id);
              history.replace({ search: urlSearchParams.toString() });
            }}
            title={id}
          >
            🔧
          </span>
        </span>
      )}
      {children}
    </>
  );
} |> withRouter);
