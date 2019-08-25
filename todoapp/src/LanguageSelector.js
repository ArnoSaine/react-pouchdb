import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { KEY } from 'LanguageDetectorUrlSearchChange';
import useT from 'useT';

const LANGUAGE_CHANGED = 'languageChanged';

export default (function LanguageSelector({ availableLanguages, location }) {
  const t = useT();
  const { i18n } = useTranslation();
  const [lng, setLng] = useState(i18n.language);
  useEffect(() => {
    i18n.on(LANGUAGE_CHANGED, setLng);
    return () => {
      i18n.off(LANGUAGE_CHANGED, setLng);
    };
  }, [i18n]);
  return (
    <ul>
      {availableLanguages.map(available => {
        const children = t(['lng', available].join('.'));
        return (
          <li key={available}>
            {available === lng ? (
              children
            ) : (
              <Link
                replace
                to={{
                  ...location,
                  search: do {
                    const urlSearchParams = new URLSearchParams(
                      location.search
                    );
                    urlSearchParams.set(KEY, available);
                    urlSearchParams.toString();
                  }
                }}
              >
                {children}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
} |> withRouter);
