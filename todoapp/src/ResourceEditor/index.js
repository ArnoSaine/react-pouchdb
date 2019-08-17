import { useState } from 'react';
import useT from 'useT';
import Editor from './Editor';
import { fallbackLng, availableLanguages } from '../i18n';

export default function ResourceEditor() {
  const t = useT();
  const [lng, setLng] = useState(fallbackLng);
  return (
    <>
      {availableLanguages.map(lng => (
        <button key={lng} onClick={() => setLng(lng)}>
          {t(lng)}
        </button>
      ))}
      <Editor lng={lng} />
    </>
  );
}
