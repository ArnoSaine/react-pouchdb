import Dynamic from 'Dynamic';
import ClearCompleted from './ClearCompleted';
import Counter from './Counter';

export default () => (
  <footer className="footer">
    <Counter />
    <Dynamic id="filter" />
    <ClearCompleted />
  </footer>
);
