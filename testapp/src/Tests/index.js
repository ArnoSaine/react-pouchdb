import { config } from 'Test';
import FindDocument from './FindDocument';
import GetDocument from './GetDocument';

export default function Tests() {
  return (
    <>
      {config.get && config.existing && (
        <GetDocument
          id="a"
          message="Get existing document"
          expected={{
            concurrent: [
              'undefined',
              'loading',
              'created',
              'update',
              'deleted'
            ],
            synchronous: ['loading', 'created', 'update', 'deleted']
          }}
        />
      )}
      {config.get && config.missing && (
        <GetDocument
          id="b"
          message="Get missing document"
          expected={{
            concurrent: [
              'undefined',
              'loading',
              'null',
              'created',
              'update',
              'deleted'
            ],
            synchronous: ['loading', 'null', 'created', 'update', 'deleted']
          }}
        />
      )}
      {config.find && config.existing && (
        <FindDocument
          selector={{ _id: 'a' }}
          message="Find existing document"
          expected={{
            concurrent: [
              'undefined',
              'loading',
              'created',
              'update',
              'empty array'
            ],
            synchronous: ['loading', 'created', 'update', 'empty array']
          }}
        />
      )}
      {config.find && config.missing && (
        <FindDocument
          selector={{ _id: 'b' }}
          message="Find missing document"
          expected={{
            concurrent: [
              'undefined',
              'loading',
              'empty array',
              'created',
              'update',
              'empty array'
            ],
            synchronous: [
              'loading',
              'empty array',
              'created',
              'update',
              'empty array'
            ]
          }}
        />
      )}
    </>
  );
}
