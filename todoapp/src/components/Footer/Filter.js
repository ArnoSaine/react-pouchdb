import { NavLink } from 'react-router-dom';
import { filters, selected } from 'todomvc-app-css/index.css';

export default () => (
  <ul className={filters}>
    {[
      { path: '', title: 'All' },
      { path: 'active', title: 'Active' },
      { path: 'completed', title: 'Completed' }
    ].map(({ path, title }) => (
      <li key={path}>
        <NavLink activeClassName={selected} exact to={`/${path}`}>
          {title}
        </NavLink>
      </li>
    ))}
  </ul>
);
