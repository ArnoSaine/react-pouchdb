import React from 'react';

export default function Suspense({ children }) {
  return <React.Suspense fallback="loading...">{children}</React.Suspense>;
}
