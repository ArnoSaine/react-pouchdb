import renderer from 'react-test-renderer';
import PouchDBModule from 'pouchdb-node';
import { Get, PouchDB } from '..';
import { closeDB, renderOrder } from './utils';

let rev;
const db = new PouchDBModule('test');

test(
  'fetch document',
  closeDB(async closeDB => {
    expect.assertions(1);
    try {
      // Remove possible old document.
      const db = new PouchDBModule('test');
      const doc = await db.get('test');
      await db.remove(doc);
    } catch {}
    const App = () => (
      <Get
        id="test"
        render={({ db, doc }) =>
          do {
            expect(doc.a).toBe('moo');
            rev = doc._rev;
            closeDB(db);
          }
        }
      />
    );
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
    db.post({ _id: 'test', a: 'moo' });
  })
);

test(
  'update document, fetch specific revision, use other options',
  closeDB(closeDB => {
    expect.assertions(4);
    const App = () => (
      <div>
        <Get
          id="test"
          render={renderOrder(
            ({ db, doc }) => {
              expect(doc.a).toBe('moo');
              db.post({ ...doc, a: 'moo2' });
            },
            ({ db, doc }) => {
              expect(doc.a).toBe('moo2');
              rev = doc._rev;
              setTimeout(() => closeDB(db), 1000);
            }
          )}
        />
        {/* Get specific revision and render only once */}
        <Get
          id="test"
          rev={rev}
          render={({ doc }) => {
            expect(doc.a).toBe('moo');
            return null;
          }}
        />
        {/* Use other options and render only once */}
        <Get
          id="test"
          revs
          render={({ doc }) => {
            expect(Array.isArray(doc._revisions.ids)).toBe(true);
            return null;
          }}
        />
      </div>
    );
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
  })
);

const testAttachments = ({ name, props, format, value1, value2 }) =>
  test(
    `attachment, ${name}`,
    closeDB(async closeDB => {
      expect.assertions(3);
      const db = new PouchDBModule('test');
      await db.putAttachment(
        'test',
        'att.txt',
        rev,
        Buffer.from('Moo?', 'utf8'),
        'text/plain'
      );
      const App = () => (
        <Get
          id="test"
          {...props}
          render={renderOrder(
            ({ attachments, db, doc }) =>
              do {
                expect(format(attachments['att.txt'].data)).toBe(value1);
                db.putAttachment(
                  'test',
                  'att.txt',
                  doc._rev,
                  Buffer.from('Moo2?', 'utf8'),
                  'text/plain'
                );
              },
            ({ attachments, db, doc }) =>
              do {
                expect(format(attachments['att.txt'].data)).toBe(value2);
                db.removeAttachment(doc._id, 'att.txt', doc._rev);
              },
            ({ attachments, db, doc }) =>
              do {
                expect(attachments).toBeUndefined();
                rev = doc._rev;
                closeDB(db);
              }
          )}
        />
      );
      renderer.create(
        <PouchDB name="test">
          <App />
        </PouchDB>
      );
    })
  );

testAttachments({
  name: 'base64',
  props: {
    attachments: true
  },
  format: atob,
  value1: 'Moo?',
  value2: 'Moo2?'
});

testAttachments({
  name: 'u8a',
  props: {
    attachments: 'u8a'
  },
  format: String,
  value1: 'Moo?',
  value2: 'Moo2?'
});

testAttachments({
  name: 'binary',
  props: {
    attachments: true,
    binary: true
  },
  format: String,
  value1: 'Moo?',
  value2: 'Moo2?'
});

test(
  'remove document',
  closeDB(closeDB => {
    expect.assertions(4);
    const App = () => (
      <Get
        id="test"
        children={renderOrder(
          ({ exists }) => {
            expect(exists).toBe(undefined);
          },
          ({ db, doc, exists }) => {
            expect(exists).toBe(true);
            db.remove(doc);
          },
          ({ db, doc, exists }) => {
            expect(exists).toBe(false);
            expect(doc._deleted).toBe(true);
            closeDB(db);
          }
        )}
      />
    );
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
  })
);
