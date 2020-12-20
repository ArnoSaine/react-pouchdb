import { useFind } from 'react-pouchdb';

export default function Counter() {
  const docs = useFind({
    selector: {
      completed: { $ne: true },
    },
  });
  const { length } = docs;
  return (
    <span className="todo-count">
      {length} {length === 1 ? 'item' : 'items'} left
    </span>
  );
}
