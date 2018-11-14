import { useContext } from 'react';
import DBContext from './DBContext';

export default function useDB({ callee, example, test = true } = {}) {
  const db = useContext(DBContext);

  if (test) {
    if (!db) {
      throw new Error(
        callee
          ? `\`${callee}\` was called without \`db\` and database is not in context. Provide database using <PouchDB /> or \`${example}\``
          : 'Database is not in context. Provide database using <PouchDB />'
      );
    }
    return db;
  }
}
