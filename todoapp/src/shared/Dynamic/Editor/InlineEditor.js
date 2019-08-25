import useT from 'useT';
import { withRouter } from 'react-router-dom';
import { useIsEnabled } from './editMode';
import { KEY } from '.';

export default (function InlineEditor({
  enabled,
  id,
  children,
  history,
  location
}) {
  const t = useT();
  return (
    <>
      {useIsEnabled() && (
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
              const urlSearchParams = new URLSearchParams(location.search);
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
