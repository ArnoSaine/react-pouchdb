import { useFind } from 'react-pouchdb';
import Item from './Item';

const filterByCompletedField = {
  active: { $ne: true },
  completed: true,
};

export default function Docs({
  match: {
    params: { filter },
  },
}) {
  const docs = useFind({
    selector: {
      timestamp: { $gte: null },
      completed: filterByCompletedField[filter],
    },
    sort: ['timestamp'],
  });
  return (
    <ul className="todo-list">
      {docs.map((doc) => (
        <Item key={doc._id} doc={doc} />
      ))}
    </ul>
  );
}
