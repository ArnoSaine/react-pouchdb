import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDB, useGet } from 'react-pouchdb/browser';

export default function AddResourceBundle() {
  useAddResourceBundle();
  return null;
}

export function useAddResourceBundle(reset) {
  const { i18n } = useTranslation();
  const resource = useGet('translations', { id: 'en' });
  const { put } = useDB('translations');
  useEffect(() => {
    if (resource) {
      i18n.addResourceBundle('en', 'translation', resource.bundle);
    } else {
      reset(put, resource);
    }
  }, [i18n, put, reset, resource]);
}
