import { PouchDB } from 'react-pouchdb/browser';
import DestroyDB from 'DestroyDB';
import InitializeDB from './InitializeDB';
import Tests from './Tests';

const dbName = 'test';

function App() {
  return (
    <>
      <h1>Test React PouchDB</h1>
      <DestroyDB name={dbName}>
        <PouchDB name={dbName}>
          <InitializeDB>
            <Tests />
          </InitializeDB>
        </PouchDB>
      </DestroyDB>
    </>
  );
}

export default App;
