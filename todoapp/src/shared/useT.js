import { useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';

const ADDED = 'added';

export default function useT() {
  const { t, i18n } = useTranslation();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    const added = () => forceUpdate();
    i18n.store.on(ADDED, added);
    return () => {
      i18n.store.off(ADDED, added);
    };
  });
  return t;
}
