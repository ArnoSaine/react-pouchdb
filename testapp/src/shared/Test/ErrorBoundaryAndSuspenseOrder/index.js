import Test, { config } from '..';
import ErrorBoundary from './ErrorBoundary';
import Suspense from './Suspense';

export default function ErrorBoundaryAndSuspenseOrder({
  children,
  message,
  ...otherProps
}) {
  return (
    <>
      {config.suspenseBeforeErrorBoundary && (
        <Test message={`Suspense > ErrorBoundary: ${message}`} {...otherProps}>
          <Suspense>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Suspense>
        </Test>
      )}
      {config.errorBoundaryBeforeSuspense && (
        <Test message={`ErrorBoundary > Suspense: ${message}`} {...otherProps}>
          <ErrorBoundary>
            <Suspense>{children}</Suspense>
          </ErrorBoundary>
        </Test>
      )}
    </>
  );
}
