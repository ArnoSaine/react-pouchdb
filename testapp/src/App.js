import { PouchDB, Get, Find } from 'react-pouchdb/browser';
import Test from './Test';
import DestroyDB from './DestroyDB';
import InitializeDB from './InitializeDB';

function App() {
  return (
    <>
      <h1>Test React PouchDB</h1>
      <DestroyDB>
        <PouchDB name="test">
          <InitializeDB>
            <Test description="Get document">
              <Get
                id="a"
                render={({ doc }) => (doc ? doc.value : 'not found')}
              />
            </Test>
            <Test description="Find document">
              <Find
                selector={{
                  _id: 'a'
                }}
                render={({ docs }) => docs?.[0]?.value ?? 'not found'}
              />
            </Test>
          </InitializeDB>
        </PouchDB>
      </DestroyDB>
    </>
  );
}

export default App;
