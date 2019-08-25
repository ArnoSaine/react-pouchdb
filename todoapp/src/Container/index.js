import Dynamic from 'Dynamic';
import styles from './styles.module.css';
import { availableLanguages } from '../i18n';

export default ({ children }) => (
  <div className={`learn-bar ${styles['learn-bar']}`}>
    <Dynamic id="aside" availableLanguages={availableLanguages} />
    {children}
  </div>
);
