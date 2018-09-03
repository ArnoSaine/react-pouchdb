import renderer from 'react-test-renderer';
import PouchDBModule from 'pouchdb';
import { PouchDB, withDB } from '..';
import { asyncTest } from './utils';

test(
  'provide database',
  asyncTest(done => {
    expect.assertions(1);
    const App = withDB(
      ({ db }) => do {
        expect(db).toBeInstanceOf(PouchDBModule);
        done();
      }
    );
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
  })
);
