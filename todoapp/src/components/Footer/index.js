import { footer } from 'todomvc-app-css/index.css';
import ClearCompleted from './ClearCompleted';
import Counter from './Counter';
import Filter from './Filter';

export default () => (
  <footer className={footer}>
    <Counter />
    <Filter />
    <ClearCompleted />
  </footer>
);
