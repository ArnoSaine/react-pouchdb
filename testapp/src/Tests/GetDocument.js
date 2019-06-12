import { useGet } from 'react-pouchdb/browser';
import { useTestRender, ErrorBoundaryAndSuspenseOrder } from 'Test';
import { deepStrictEqual } from 'assert';

export default function FindDocument() {
  return (
    <ErrorBoundaryAndSuspenseOrder
      message="Get document"
      test={actual =>
        deepStrictEqual(actual, ['loading', 'not found', 'created'])
      }
    >
      <Test />
    </ErrorBoundaryAndSuspenseOrder>
  );
}

function Test() {
  return useTestRender(useGet({ id: 'a' })?.value ?? 'not found');
}
