import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDB } from 'react-pouchdb/browser';

export default function Item({ doc, doc: { completed = false, title } }) {
  const { put, remove } = useDB();
  const [focus, setFocus] = useState();
  const [isEditing, setIsEditing] = useState();
  const inputRef = useRef();

  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
      setFocus(false);
    }
  }, [focus, setFocus]);

  function handleSave() {
    setIsEditing(false);
    put({
      ...doc,
      title: inputRef.current.value.trim()
    });
  }

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
        defaultValue={title}
        onKeyDown={({ keyCode }) => {
          if (keyCode === 13) {
            handleSave();
          }
        }}
        onBlur={handleSave}
      />
    </li>
  );
}
