import { useTestRender, SynchronousAndConcurrentAPIs } from 'Test';

export default function AllDocuments({ singleKey, keys, ...otherProps }) {
  return (
    <SynchronousAndConcurrentAPIs {...otherProps}>
      {api => <Test {...{ api, singleKey, keys, include_docs: true }} />}
    </SynchronousAndConcurrentAPIs>
  );
}

function Test({ api: { useAllDocs }, singleKey, ...otherProps }) {
  const docs = useAllDocs({ key: singleKey, ...otherProps });
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
