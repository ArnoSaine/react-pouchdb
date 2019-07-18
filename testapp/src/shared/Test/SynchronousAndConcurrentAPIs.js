import * as synchronous from 'react-pouchdb/browser';
import * as concurrent from 'react-pouchdb/browser/concurrent';
import { ErrorBoundaryAndSuspenseOrder, config } from '.';
import { deepStrictEqual } from 'assert';

export default function SynchronousAndConcurrentModes({
  message,
  expected,
  children
}) {
  return (
    <>
      {config.concurrent && (
        <ErrorBoundaryAndSuspenseOrder
          message={`Concurrent: ${message}`}
          test={actual => deepStrictEqual(actual, expected.concurrent)}
        >
          {children(concurrent)}
        </ErrorBoundaryAndSuspenseOrder>
      )}
      {config.synchronous && (
        <ErrorBoundaryAndSuspenseOrder
          message={`Synchronous: ${message}`}
          test={actual => deepStrictEqual(actual, expected.synchronous)}
        >
          {children(synchronous)}
        </ErrorBoundaryAndSuspenseOrder>
      )}
    </>
  );
}
