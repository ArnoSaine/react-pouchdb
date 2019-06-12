import { PouchDB, useFind, useGet } from 'react-pouchdb/browser';
import { useTestRender, ErrorBoundaryAndSuspenseOrder } from './Test';
import DestroyDB from './DestroyDB';
import InitializeDB from './InitializeDB';
import { deepStrictEqual } from 'assert';

function App() {
  return (
    <>
      <h1>Test React PouchDB</h1>
      <DestroyDB>
        <PouchDB name="test">
          <InitializeDB>
            <ErrorBoundaryAndSuspenseOrder
              message="Get document"
              test={actual =>
                deepStrictEqual(actual, ['loading', 'not found', 'created'])
              }
            >
              <GetDocument />
            </ErrorBoundaryAndSuspenseOrder>
            <ErrorBoundaryAndSuspenseOrder
              message="Find document"
              test={actual =>
                deepStrictEqual(actual, ['loading', 'not found', 'created'])
              }
            >
              <FindDocument />
            </ErrorBoundaryAndSuspenseOrder>
          </InitializeDB>
        </PouchDB>
      </DestroyDB>
    </>
  );
}

export default App;

function GetDocument() {
  return useTestRender(useGet({ id: 'a' })?.value ?? 'not found');
}

function FindDocument() {
  return useTestRender(
    useFind({ selector: { _id: 'a' } })?.[0]?.value ?? 'not found'
  );
}
