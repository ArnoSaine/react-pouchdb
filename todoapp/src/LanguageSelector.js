import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { KEY } from 'LanguageDetectorUrlSearchChange';

const LANGUAGE_CHANGED = 'languageChanged';

export default (function LanguageSelector({ availableLanguages, location }) {
  const { t, i18n } = useTranslation();
  const [lng, setLng] = useState(i18n.language);
  useEffect(() => {
    i18n.on(LANGUAGE_CHANGED, setLng);
    return () => {
      i18n.off(LANGUAGE_CHANGED, setLng);
    };
  }, [i18n]);
  return (
    <ul>
      {availableLanguages.map(available => (
        <li key={available}>
          {available === lng ? (
            t(available)
          ) : (
            <Link
              replace
              to={{
                ...location,
                search: do {
                  const urlSearchParams = new URLSearchParams(location.search);
                  urlSearchParams.set(KEY, available);
                  urlSearchParams.toString();
                }
              }}
            >
              {t(available)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
} |> withRouter);
