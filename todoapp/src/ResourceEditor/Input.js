import { useEffect, useRef } from 'react';

export default function Input({ value, handleSave }) {
  const ref = useRef();
  useEffect(() => {
    ref.current.value = value;
  }, [value]);
  return (
    <input
      ref={ref}
      defaultValue={value}
      onKeyDown={event => {
        if (event.keyCode === 13) {
          handleSave(event);
        }
      }}
      onBlur={handleSave}
      type="text"
    />
  );
}
