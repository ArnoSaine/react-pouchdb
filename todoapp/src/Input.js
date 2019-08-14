import { useDB } from 'react-pouchdb/browser';
import useT from 'useT';

export default function Input() {
  const { post } = useDB();
  const t = useT();
  return (
    <input
      autoFocus
      className="new-todo"
      onKeyDown={({ keyCode, target }) => {
        const title = target.value.trim();
        if (keyCode === 13 && title) {
          post({ title, timestamp: Date.now() });
          target.value = '';
        }
      }}
      placeholder={t('placeholder')}
      type="text"
    />
  );
}
