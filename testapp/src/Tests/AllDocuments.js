import { useTestRender, SynchronousAndConcurrentAPIs } from 'Test';

export default function AllDocuments({ id, ...otherProps }) {
  return (
    <SynchronousAndConcurrentAPIs {...otherProps}>
      {api => <Test {...{ api, id }} />}
    </SynchronousAndConcurrentAPIs>
  );
}

function Test({ api: { useAllDocs }, ...otherProps }) {
  const docs = useAllDocs(otherProps);
  return useTestRender(
    docs ? (docs.length ? docs[0].value : 'empty array') : docs
  );
}
