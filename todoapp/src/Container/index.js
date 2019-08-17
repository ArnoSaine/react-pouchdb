import Dynamic from 'Dynamic';
import styles from './styles.module.css';

export default ({ children }) => (
  <div className={`learn-bar ${styles['learn-bar']}`}>
    <Dynamic id="aside" />
    {children}
  </div>
);
