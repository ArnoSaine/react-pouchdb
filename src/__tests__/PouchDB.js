import PouchDBModule from 'pouchdb';
import { instanceOf } from 'prop-types';
import renderer from 'react-test-renderer';
import { PouchDB, withDB } from '..';
import { closeDB } from './utils';

const withDBContext = Component =>
  Object.assign((...args) => Component(...args), {
    contextTypes: {
      db: instanceOf(PouchDBModule).isRequired
    }
  });

test(
  'provide database',
  closeDB(closeDB => {
    expect.assertions(4);
    const App = withDBContext(
      (props, { db }) =>
        do {
          expect(db).toBeInstanceOf(PouchDBModule);
          expect(db.name).toBe('test');
          expect(db.__opts.revs_limit).toBeUndefined();
          expect(db._maxListeners).toBeUndefined();
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

test(
  'set options',
  closeDB(closeDB => {
    expect.assertions(1);
    const revsLimit = 4;
    const App = withDB(
      ({ db }) =>
        do {
          expect(db.__opts.revs_limit).toBe(revsLimit);
          closeDB(db);
        }
    );
    renderer.create(
      <PouchDB name="test" revs_limit={4}>
        <App />
      </PouchDB>
    );
  })
);

test(
  'set maxListeners',
  closeDB(closeDB => {
    expect.assertions(1);
    const maxListeners = 4;
    const App = withDB(
      ({ db }) =>
        do {
          expect(db._maxListeners).toBe(maxListeners);
          closeDB(db);
        }
    );
    renderer.create(
      <PouchDB name="test" maxListeners={maxListeners}>
        <App />
      </PouchDB>
    );
  })
);
