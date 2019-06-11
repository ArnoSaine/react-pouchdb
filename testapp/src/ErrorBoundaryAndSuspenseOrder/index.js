import ErrorBoundary from './ErrorBoundary';
import Suspense from './Suspense';

export default function ErrorBoundaryAndSuspenseOrder({ children }) {
  return (
    <>
      <h2>ErrorBoundary > Suspense</h2>
      <ErrorBoundary>
        <Suspense>{children}</Suspense>
      </ErrorBoundary>
      <h2>Suspense > ErrorBoundary</h2>
      <Suspense>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    </>
  );
}
