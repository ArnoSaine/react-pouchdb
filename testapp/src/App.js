import { PouchDB, Get, Find } from 'react-pouchdb/browser';
import Test from './Test';
import InitializeDB from './InitializeDB';

function App() {
  return (
    <>
      <h1>Test React PouchDB</h1>
      <InitializeDB>
        <Test description="Get document">
          <PouchDB name="test">
            <Get id="a" render={({ doc }) => (doc ? doc.value : 'not found')} />
          </PouchDB>
        </Test>
        <Test description="Find document">
          <PouchDB name="test">
            <Find
              selector={{
                _id: 'a'
              }}
              render={({ docs }) => docs?.[0]?.value ?? 'not found'}
            />
          </PouchDB>
        </Test>
      </InitializeDB>
    </>
  );
}

export default App;
