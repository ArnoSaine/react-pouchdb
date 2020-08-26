import { useTestRender, SynchronousAndConcurrentAPIs } from 'Test';

export default function AllDocuments({ keys, ...otherProps }) {
  return (
    <SynchronousAndConcurrentAPIs {...otherProps}>
      {api => <Test {...{ api, keys, include_docs: true }} />}
    </SynchronousAndConcurrentAPIs>
  );
}

function Test({ api: { useAllDocs }, ...otherProps }) {
  const docs = useAllDocs(otherProps);
  return useTestRender(
    docs
      ? docs.length
        ? docs[0].doc
          ? docs[0].doc.value
          : 'deleted'
        : 'empty array'
      : docs
  );
}
