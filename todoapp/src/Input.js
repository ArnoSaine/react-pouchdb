import { useDB } from 'react-pouchdb/browser';
import Dynamic from 'Dynamic';

export default function Input() {
  const { post } = useDB();
  return (
    <Dynamic
      id="input"
      onKeyDown={({ keyCode, target }) => {
        const title = target.value.trim();
        if (keyCode === 13 && title) {
          post({ title, timestamp: Date.now() });
          target.value = '';
        }
      }}
    />
  );
}
