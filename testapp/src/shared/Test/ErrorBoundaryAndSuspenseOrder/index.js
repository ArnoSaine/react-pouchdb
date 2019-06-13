import Test from '..';
import ErrorBoundary from './ErrorBoundary';
import Suspense from './Suspense';

export default function ErrorBoundaryAndSuspenseOrder({
  children,
  message,
  ...otherProps
}) {
  return (
    <>
      <Test message={`ErrorBoundary > Suspense: ${message}`} {...otherProps}>
        <ErrorBoundary>
          <Suspense>{children}</Suspense>
        </ErrorBoundary>
      </Test>
      <Test message={`Suspense > ErrorBoundary: ${message}`} {...otherProps}>
        <Suspense>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
      </Test>
    </>
  );
}
