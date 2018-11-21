import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDB } from 'react-pouchdb/browser';

export default function Item({ doc, doc: { completed = false } }) {
  const { put, remove } = useDB();
  const [focus, setFocus] = useState();
  const [isEditing, setIsEditing] = useState();
  const [title, setTitle] = useState(doc.title);
  const inputRef = useRef();
  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
      setFocus(false);
    }
  });

  return (
    <li
      className={classNames(completed && 'completed', isEditing && 'editing')}
      onDoubleClick={() => {
        setFocus(true);
        setIsEditing(true);
      }}
    >
      <div className="view">
        <input
          className="toggle"
          checked={completed}
          onChange={() =>
            put({
              ...doc,
              completed: !completed
            })
          }
          type="checkbox"
        />
        <label>{title}</label>
        <button className="destroy" onClick={() => remove(doc)} type="button" />
      </div>
      <input
        className="edit"
        ref={inputRef}
        type="text"
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        onBlur={() => {
          setIsEditing(false);
          put({
            ...doc,
            title
          });
        }}
      />
    </li>
  );
}
