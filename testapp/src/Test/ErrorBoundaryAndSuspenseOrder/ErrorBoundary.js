import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useTestRender } from '..';

function Fallback() {
  return useTestRender('error');
}

export default function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ReactErrorBoundary>
  );
}
