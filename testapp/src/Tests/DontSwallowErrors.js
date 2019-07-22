import { useTestRender, SynchronousAndConcurrentAPIs } from 'Test';

export default function DontSwallowErrors() {
  return (
    <SynchronousAndConcurrentAPIs
      message="Don't Swallow Errors"
      expected={{
        concurrent: ['undefined', 'loading', 'error'],
        synchronous: ['loading', 'error']
      }}
    >
      {api => <Test {...{ api }} />}
    </SynchronousAndConcurrentAPIs>
  );
}

function Test({ api: { useFind } }) {
  return useTestRender(
    useFind({ selector: { age: null }, sort: ['firstName'] })
  );
}
