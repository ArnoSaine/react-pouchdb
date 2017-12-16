import { learnBar } from 'todomvc-common/base.css';
import Aside from './Aside';
import custom from './styles.css';

export default ({ children }) => (
  <div className={`${learnBar} ${custom.learnBar}`}>
    <Aside />
    {children}
  </div>
);
