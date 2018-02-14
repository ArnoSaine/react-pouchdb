import PouchDB from 'pouchdb';

export default () =>
  beforeEach(async () => {
    try {
      const db = new PouchDB('test');
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
