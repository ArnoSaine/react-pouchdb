import { useDB } from 'react-pouchdb/browser';
import Dynamic from 'Dynamic';

export default function Input() {
  const { post } = useDB();
  return (
    <Dynamic
      id="input"
      onKeyDown={({ key, target }) => {
        const title = target.value.trim();
        if (key === 'Enter' && title) {
          post({ title, timestamp: Date.now() });
          target.value = '';
        }
      }}
    />
  );
}
