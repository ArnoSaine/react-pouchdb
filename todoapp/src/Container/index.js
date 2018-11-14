import React from 'react';
import Aside from './Aside';
import styles from './styles.module.css';

export default ({ children }) => (
  <div className={`learn-bar ${styles['learn-bar']}`}>
    <Aside />
    {children}
  </div>
);
