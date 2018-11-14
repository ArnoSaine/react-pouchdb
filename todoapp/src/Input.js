import React from 'react';
import { useDB } from 'react-pouchdb/browser';

export default function Input() {
  const { post } = useDB();
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
      placeholder="What needs to be done?"
      type="text"
    />
  );
}
