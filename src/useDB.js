import { useContext } from 'react';
import PouchDB from 'pouchdb';
import DBContext from './DBContext';
import { create } from './pouchdbConnections';

export default function useDB(
  db,
  { callee = 'useDB', example = 'useDB(options)' } = {}
) {
  if (db) {
    if (db instanceof PouchDB) {
      return db;
    }
    return create(db);
  }

  const dbContext = useContext(DBContext);

  if (dbContext) {
    return dbContext;
  }

  throw new Error(
    callee
      ? `\`${callee}\` was called without \`db\` and database is not in context. Provide database using <PouchDB /> or \`${example}\``
      : 'Database is not in context. Provide database using <PouchDB />'
  );
}
