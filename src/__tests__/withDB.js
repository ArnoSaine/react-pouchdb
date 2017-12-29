import renderer from 'react-test-renderer';
import PouchDBModule from 'pouchdb';
import { PouchDB, withDB } from '..';
import { closeDB } from './utils';

test(
  'provide database',
  closeDB(closeDB => {
    expect.assertions(1);
    const App = withDB(
      ({ db }) =>
        do {
          expect(db).toBeInstanceOf(PouchDBModule);
          closeDB(db);
        }
    );
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
  })
);
