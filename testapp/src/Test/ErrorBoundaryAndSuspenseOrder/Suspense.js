import React from 'react';
import { useTestRender } from '..';

export default function Suspense({ children }) {
  return <React.Suspense fallback={<Fallback />}>{children}</React.Suspense>;
}

function Fallback() {
  return useTestRender('loading');
}
