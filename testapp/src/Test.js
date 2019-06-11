import ErrorBoundaryAndSuspenseOrder from './ErrorBoundaryAndSuspenseOrder';

export default function Test({ description, children }) {
  return (
    <ErrorBoundaryAndSuspenseOrder>
      <h3>{description}</h3>
      {children}
    </ErrorBoundaryAndSuspenseOrder>
  );
}
