import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

function Fallback() {
  return 'error';
}

export default function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ReactErrorBoundary>
  );
}
