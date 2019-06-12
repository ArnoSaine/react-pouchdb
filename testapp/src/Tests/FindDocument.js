import { useFind } from 'react-pouchdb/browser';
import { useTestRender, ErrorBoundaryAndSuspenseOrder } from 'Test';
import { deepStrictEqual } from 'assert';

export default function FindDocument() {
  return (
    <ErrorBoundaryAndSuspenseOrder
      message="Find document"
      test={actual =>
        deepStrictEqual(actual, ['loading', 'not found', 'created'])
      }
    >
      <Test />
    </ErrorBoundaryAndSuspenseOrder>
  );
}

function Test() {
  return useTestRender(
    useFind({ selector: { _id: 'a' } })?.[0]?.value ?? 'not found'
  );
}
