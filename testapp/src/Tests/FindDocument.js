import { useFind } from 'react-pouchdb/browser';
import { useTestRender, ErrorBoundaryAndSuspenseOrder } from 'Test';
import { deepStrictEqual } from 'assert';

export default function FindDocument({ selector, message, expected }) {
  return (
    <ErrorBoundaryAndSuspenseOrder
      message={message}
      test={actual => deepStrictEqual(actual, expected)}
    >
      <Test selector={selector} />
    </ErrorBoundaryAndSuspenseOrder>
  );
}

function Test({ selector }) {
  return useTestRender(useFind({ selector })?.[0]?.value ?? 'not found');
}
