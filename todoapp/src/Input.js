import { useDB } from 'react-pouchdb';

export default function Input() {
  const { post } = useDB();
  return (
    <input
      autoFocus
      className="new-todo"
      onKeyDown={({ key, target }) => {
        const title = target.value.trim();
        if (key === 'Enter' && title) {
          post({ title, timestamp: Date.now() });
          target.value = '';
        }
      }}
      placeholder="What needs to be done?"
      type="text"
    />
  );
}
