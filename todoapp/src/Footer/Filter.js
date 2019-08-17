import { NavLink } from 'react-router-dom';

export default function Filter() {
  return (
    <ul className="filters">
      {[
        { path: '', title: 'All' },
        { path: 'active', title: 'Active' },
        { path: 'completed', title: 'Completed' }
      ].map(({ path, title }) => (
        <li key={path}>
          <NavLink activeClassName="selected" exact replace to={`/${path}`}>
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
