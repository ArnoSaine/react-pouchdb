import { useGet } from 'react-pouchdb/browser';
import { useTestRender, ErrorBoundaryAndSuspenseOrder } from 'Test';
import { deepStrictEqual } from 'assert';

export default function GetDocument({ id, message, expected }) {
  return (
    <ErrorBoundaryAndSuspenseOrder
      message={message}
      test={actual => deepStrictEqual(actual, expected)}
    >
      <Test id={id} />
    </ErrorBoundaryAndSuspenseOrder>
  );
}

function Test({ id }) {
  return useTestRender(useGet({ id })?.value ?? 'not found');
}
