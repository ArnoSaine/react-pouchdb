import renderer from 'react-test-renderer';
import PouchDBModule from 'pouchdb';
import { Get, PouchDB } from '..';
import { asyncTest, clean, renderOrder } from './utils';

clean();

test(
  'fetch document',
  asyncTest(async done => {
    expect.assertions(1);
    const App = () => (
      <Get
        id="test"
        render={({ doc }) => do {
          expect(doc.a).toBe('moo');
          done();
        }}
      />
    );
    renderer.create(
      <PouchDB name="test">
        <App />
      </PouchDB>
    );
    const db = new PouchDBModule('test');
    db.post({ _id: 'test', a: 'moo' });
  })
);

test(
  'update document, fetch specific revision, use other options',
  asyncTest(async done => {
    expect.assertions(5);
    const db = new PouchDBModule('test');
    const { rev } = await db.post({ _id: 'test', a: 'moo' });
    const App = () => (
      <div>
        <Get
          id="test"
          render={renderOrder(
            ({ db, doc }) => {
              expect(doc.a).toBe('moo');
              db.put({ ...doc, a: 'moo2' });
            },
            ({ doc }) => {
              expect(doc.a).toBe('moo2');
              setTimeout(() => done(), 1000);
            }
          )}
        />
        {/* Get specific revision and render only once */}
        <Get
          id="test"
          rev={rev}
          render={({ doc }) => {
            expect(doc.a).toBe('moo');
            expect(doc._revisions).toBeUndefined();
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
    asyncTest(async done => {
      expect.assertions(3);
      const db = new PouchDBModule('test');
      const { rev } = await db.post({ _id: 'test', a: 'moo' });
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
            ({ attachments, db, doc }) => do {
              expect(format(attachments['att.txt'].data)).toBe(value1);
              db.putAttachment(
                'test',
                'att.txt',
                doc._rev,
                Buffer.from('Moo2?', 'utf8'),
                'text/plain'
              );
            },
            ({ attachments, db, doc }) => do {
              expect(format(attachments['att.txt'].data)).toBe(value2);
              db.removeAttachment(doc._id, 'att.txt', doc._rev);
            },
            ({ attachments }) => do {
              expect(attachments).toBeUndefined();
              done();
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
  asyncTest(done => {
    expect.assertions(5);
    const App = () => (
      <Get
        id="test"
        children={renderOrder(
          ({ exists }) => {
            expect(exists).toBe(undefined);
          },
          ({ db, exists }) => {
            expect(exists).toBe(false);
            db.post({ _id: 'test' });
          },
          ({ db, doc, exists }) => {
            expect(exists).toBe(true);
            db.remove(doc);
          },
          ({ doc, exists }) => {
            expect(exists).toBe(false);
            expect(doc._deleted).toBe(true);
            done();
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
