import { useTestRender, SynchronousAndConcurrentAPIs } from 'Test';

export default function FindDocument({ selector, ...otherProps }) {
  return (
    <SynchronousAndConcurrentAPIs {...otherProps}>
      {api => <Test {...{ api, selector }} />}
    </SynchronousAndConcurrentAPIs>
  );
}

function Test({ api: { useFind }, ...otherProps }) {
  const docs = useFind(otherProps);
  return useTestRender(
    docs ? (docs.length ? docs[0].value : 'empty array') : docs
  );
}
