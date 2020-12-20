import { useFind } from 'react-pouchdb';
import ClearCompleted from './ClearCompleted';
import Counter from './Counter';
import Filter from './Filter';

export default function Footer() {
  const docs = useFind({
    selector: {},
  });
  const { length } = docs;
  return length ? (
    <footer className="footer">
      <Counter />
      <Filter />
      <ClearCompleted />
    </footer>
  ) : null;
}
