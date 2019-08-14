import { useFind } from 'react-pouchdb/browser';
import useT from 'useT';

export default function Counter() {
  const docs = useFind({
    selector: {
      completed: { $ne: true }
    }
  });
  const t = useT();
  return (
    <span className="todo-count">{t('todoCount', { count: docs.length })}</span>
  );
}
