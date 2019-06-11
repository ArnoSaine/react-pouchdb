import { PouchDB, Get } from 'react-pouchdb/browser';
import ErrorBoundaryAndSuspenseOrder from './ErrorBoundaryAndSuspenseOrder';
import InitializeDB from './InitializeDB';

function App() {
  return (
    <>
      <h1>Test React PouchDB</h1>
      <InitializeDB>
        <ErrorBoundaryAndSuspenseOrder>
          <PouchDB name="test">
            <Get id="a" render={({ doc }) => (doc ? doc.value : 'not found')} />
          </PouchDB>
        </ErrorBoundaryAndSuspenseOrder>
      </InitializeDB>
    </>
  );
}

export default App;
