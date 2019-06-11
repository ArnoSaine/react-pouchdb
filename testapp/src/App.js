import { Suspense } from 'react';
import { PouchDB, Get } from 'react-pouchdb/browser';
import InitializeDB from './InitializeDB';

function App() {
  return (
    <>
      <h1>Test React PouchDB</h1>
      <InitializeDB>
        <PouchDB name="test">
          <Suspense fallback="loading...">
            <Get id="a" render={({ doc }) => (doc ? doc.value : 'not found')} />
          </Suspense>
        </PouchDB>
      </InitializeDB>
    </>
  );
}

export default App;
