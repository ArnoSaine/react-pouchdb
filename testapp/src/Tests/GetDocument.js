import { useTestRender, SynchronousAndConcurrentAPIs } from 'Test';

export default function GetDocument({ id, ...otherProps }) {
  return (
    <SynchronousAndConcurrentAPIs {...otherProps}>
      {api => <Test {...{ api, id }} />}
    </SynchronousAndConcurrentAPIs>
  );
}

function Test({ api: { useGet }, ...otherProps }) {
  const doc = useGet(otherProps);
  return useTestRender(doc ? (doc._deleted ? 'deleted' : doc.value) : doc);
}
