import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useResetResourceBundles, { dbName } from 'ResourceBundles/useReset';
import { useFind } from 'react-pouchdb/browser';
import Add from 'Add';
import { availableLanguages } from '../../i18n';

export default function AddResourceBundles() {
  const { i18n } = useTranslation();
  const resources = useFind(dbName, {
    selector: { _id: { $in: i18n.languages } }
  });
  useEffect(() => {
    resources.forEach(({ _id: lng, bundle }) =>
      i18n.addResourceBundle(lng, 'translation', bundle)
    );
  }, [resources, i18n]);
  return (
    <Add
      useReset={useResetResourceBundles}
      dbName={dbName}
      items={availableLanguages}
    />
  );
}
