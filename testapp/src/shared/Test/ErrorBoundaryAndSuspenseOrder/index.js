import Test from '..';
import ErrorBoundary from './ErrorBoundary';
import Suspense from './Suspense';

export default function ErrorBoundaryAndSuspenseOrder({
  children,
  ...otherProps
}) {
  return (
    <>
      <h2>ErrorBoundary > Suspense</h2>
      <Test {...otherProps}>
        <ErrorBoundary>
          <Suspense>{children}</Suspense>
        </ErrorBoundary>
      </Test>
      <h2>Suspense > ErrorBoundary</h2>
      <Test {...otherProps}>
        <Suspense>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
      </Test>
    </>
  );
}
