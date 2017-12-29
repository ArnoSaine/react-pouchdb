import renderer from 'react-test-renderer';
import PouchDBModule from 'pouchdb';
import property from 'lodash/property';
import { Find, PouchDB, withDB } from '..';
import { closeDB, renderOrder } from './utils';

beforeEach(async () => {
  try {
    // Remove possible old documents.
    const db = new PouchDBModule('test');
    const { rows } = await db.allDocs();
    await db.bulkDocs(
      rows.map(({ id, value: { rev } }) => ({
        _id: id,
        _rev: rev,
        _deleted: true
      }))
    );
  } catch {}
});

test(
  'selector',
  closeDB(async closeDB => {
    expect.assertions(6);
    const App = withDB(() => (
      <Find
        selector={{
          a: 'moo'
        }}
        render={renderOrder(
          ({ db, docs }) => {
            expect(docs.length).toBe(0);
            db.bulkDocs([{ _id: '1', a: 'moo' }, { _id: '2', a: 'moo2' }]);
          },
          ({ db, docs }) => {
            expect(docs.length).toBe(1);
            db.post({ a: 'moo' });
          },
          async ({ db, docs }) => {
            expect(docs.length).toBe(2);
            const { rev } = await db.put({ ...docs[0], a: 'moo2' });
            db.put({ ...docs[0], _rev: rev, a: 'moo' });
          },
          ({ docs }) => {
            expect(docs.length).toBe(1);
          },
          ({ db, docs }) => {
            expect(docs.length).toBe(2);
            db.remove(docs[0]);
          },
          ({ db, docs }) => {
            expect(docs.length).toBe(1);
            closeDB(db);
          }
        )}
      />
    ));
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
  })
);

test(
  'sort',
  closeDB(async closeDB => {
    expect.assertions(3);
    const App = withDB(() => (
      <Find
        selector={{
          a: { $gte: null }
        }}
        sort={[{ a: 'desc' }]}
        render={renderOrder(
          ({ db, docs }) => {
            expect(docs.length).toBe(0);
            db.bulkDocs([
              { a: 'moo' },
              { a: false },
              { a: 'moo2' },
              { a: null },
              { a: 123 }
            ]);
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([
              'moo2',
              'moo',
              123,
              false,
              null
            ]);
            db.put({ ...docs[0], a: true });
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([
              'moo',
              123,
              true,
              false,
              null
            ]);
            closeDB(db);
          }
        )}
      />
    ));
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
  })
);

test(
  'limit',
  closeDB(async closeDB => {
    expect.assertions(7);
    const App = withDB(() => (
      <Find
        selector={{
          a: { $gte: null }
        }}
        sort={['a']}
        limit={2}
        render={renderOrder(
          ({ db, docs }) => {
            expect(docs.length).toBe(0);
            db.bulkDocs([
              { a: 'moo' },
              { a: false },
              { a: 'moo2' },
              { a: null },
              { a: 123 }
            ]);
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([null, false]);
            db.put({ ...docs[0], a: true });
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([false, true]);
            db.put({ ...docs[0], a: 123.456 });
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([true, 123]);
            db.remove(docs[1]);
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([true, 123.456]);
            db.post({ a: 123.01 });
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([true, 123.01]);
            db.post({ a: 999 });
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([true, 123.01]);
            closeDB(db);
          }
        )}
      />
    ));
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
  })
);

test(
  'skip',
  closeDB(async closeDB => {
    expect.assertions(5);
    const App = withDB(() => (
      <Find
        selector={{
          a: { $gte: null }
        }}
        sort={['a']}
        skip={2}
        render={renderOrder(
          ({ db, docs }) => {
            expect(docs.length).toBe(0);
            db.bulkDocs([
              { a: 'moo' },
              { a: false },
              { a: 'moo2' },
              { a: null },
              { a: 123 }
            ]);
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([123, 'moo', 'moo2']);
            db.put({ ...docs[2], a: 1.2 });
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([1.2, 123, 'moo']);
            db.put({ ...docs[2], a: null });
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([false, 1.2, 123]);
            db.post({ a: 99 });
          },
          ({ db, docs }) => {
            expect(docs.map(property('a'))).toEqual([false, 1.2, 99, 123]);
            closeDB(db);
          }
        )}
      />
    ));
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
  })
);
