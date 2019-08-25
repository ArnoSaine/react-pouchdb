import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

export const KEY = 'lng';

export default (function LanguageDetectorUrlSearchChange({
  history,
  location
}) {
  const { i18n } = useTranslation();
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const lng = urlSearchParams.get(KEY);
    if (lng) {
      i18n.changeLanguage(lng);
      urlSearchParams.delete(KEY);
      history.replace({ search: urlSearchParams.toString() });
    }
  });
  return null;
} |> withRouter);
