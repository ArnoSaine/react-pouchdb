import { NavLink } from 'react-router-dom';
import useT from 'useT';

export default function Filter() {
  const t = useT();
  const titles = t('filter', { returnObjects: true });
  return (
    <ul className="filters">
      {['', 'active', 'completed'].map(path => (
        <li key={path}>
          <NavLink activeClassName="selected" exact replace to={`/${path}`}>
            {titles[path]}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
