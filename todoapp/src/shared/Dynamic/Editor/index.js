import useT from 'useT';
import { Link, withRouter } from 'react-router-dom';

export const KEY = 'edit';

export default (function Editor({ enabled, id, children, history, location }) {
  const t = useT();
  const urlSearchParams = new URLSearchParams(location.search);
  urlSearchParams.set(KEY, id);
  return (
    <>
      {new URLSearchParams(location.search).has(KEY) && (
        <span style={{ position: 'relative' }}>
          <Link to={{ search: urlSearchParams.toString() }} replace>
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
              title={id}
            >
              🔧
            </span>
          </Link>
        </span>
      )}
      {children}
    </>
  );
} |> withRouter);
