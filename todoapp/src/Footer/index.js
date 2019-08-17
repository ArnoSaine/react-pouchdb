import Dynamic from 'Dynamic';
import { useFind } from 'react-pouchdb/browser';
import ClearCompleted from './ClearCompleted';
import Counter from './Counter';

export default function Footer() {
  const docs = useFind({
    selector: {}
  });
  const { length } = docs;
  return length ? (
    <footer className="footer">
      <Counter />
      <Dynamic id="filter" />
      <ClearCompleted />
    </footer>
  ) : null;
}
