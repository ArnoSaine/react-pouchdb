import { PouchDB, Get, Find } from 'react-pouchdb/browser';
import ErrorBoundaryAndSuspenseOrder from './ErrorBoundaryAndSuspenseOrder';
import InitializeDB from './InitializeDB';

function App() {
  return (
    <>
      <h1>Test React PouchDB</h1>
      <InitializeDB>
        <ErrorBoundaryAndSuspenseOrder>
          <h3>Get document</h3>
          <PouchDB name="test">
            <Get id="a" render={({ doc }) => (doc ? doc.value : 'not found')} />
          </PouchDB>
        </ErrorBoundaryAndSuspenseOrder>
        <ErrorBoundaryAndSuspenseOrder>
          <h3>Find document</h3>
          <PouchDB name="test">
            <Find
              selector={{
                _id: 'a'
              }}
              render={({ docs }) => docs?.[0]?.value ?? 'not found'}
            />
          </PouchDB>
        </ErrorBoundaryAndSuspenseOrder>
      </InitializeDB>
    </>
  );
}

export default App;
