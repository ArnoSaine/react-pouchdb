import { PouchDB } from 'react-pouchdb/browser';
import DestroyDB from 'DestroyDB';
import TestSequence from './TestSequence';
import Tests from './Tests';

const dbName = 'test';

function App() {
  return (
    <>
      <h1>Test React PouchDB</h1>
      <DestroyDB name={dbName}>
        <PouchDB name={dbName}>
          <TestSequence>
            <Tests />
          </TestSequence>
        </PouchDB>
      </DestroyDB>
    </>
  );
}

export default App;
