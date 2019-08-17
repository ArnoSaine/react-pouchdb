import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const availableLanguages = ['en', 'fi'];
export const [fallbackLng] = availableLanguages;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    debug: process.NODE_ENV === 'development',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    resources: {}
  });

export default i18n;
