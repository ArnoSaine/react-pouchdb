import PouchDBModule from 'pouchdb';
import { instanceOf } from 'prop-types';
import renderer from 'react-test-renderer';
import { PouchDB, withDB } from '..';
import { asyncTest } from './utils';

const withDBContext = Component =>
  Object.assign((...args) => Component(...args), {
    contextTypes: {
      db: instanceOf(PouchDBModule).isRequired
    }
  });

test(
  'provide database',
  asyncTest(done => {
    expect.assertions(4);
    const App = withDBContext(
      (props, { db }) =>
        do {
          expect(db).toBeInstanceOf(PouchDBModule);
          expect(db.name).toBe('test');
          expect(db.__opts.revs_limit).toBeUndefined();
          expect(db._maxListeners).toBeUndefined();
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

test(
  'set options',
  asyncTest(done => {
    expect.assertions(1);
    const revsLimit = 4;
    const App = withDB(
      ({ db }) =>
        do {
          expect(db.__opts.revs_limit).toBe(revsLimit);
          done();
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
  asyncTest(done => {
    expect.assertions(1);
    const maxListeners = 4;
    const App = withDB(
      ({ db }) =>
        do {
          expect(db._maxListeners).toBe(maxListeners);
          done();
        }
    );
    renderer.create(
      <PouchDB name="test" maxListeners={maxListeners}>
        <App />
      </PouchDB>
    );
  })
);
