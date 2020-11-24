import Aside from './Aside';
import styles from './styles.module.css';

export default function Container({ children }) {
  return (
    <div className={`learn-bar ${styles['learn-bar']}`}>
      <Aside />
      {children}
    </div>
  );
}
