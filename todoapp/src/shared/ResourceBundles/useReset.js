import useReset from 'useReset';
import { availableLanguages } from '../../i18n';

export default function useResetResourceBundles() {
  return useReset(dbName, availableLanguages, async lng => ({
    bundle: (await import(`../../i18n/resources/${lng}`)).default
  }));
}

export const dbName = 'translations';
