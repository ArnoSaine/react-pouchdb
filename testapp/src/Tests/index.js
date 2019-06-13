import FindDocument from './FindDocument';
import GetDocument from './GetDocument';

export default function Tests() {
  return (
    <>
      <GetDocument
        id="a"
        message="Get existing document"
        expected={['loading', 'created']}
      />
      <GetDocument
        id="b"
        message="Get document"
        expected={['loading', 'not found', 'created']}
      />
      <FindDocument
        selector={{ _id: 'a' }}
        message="Find existing document"
        expected={['loading', 'created']}
      />
      <FindDocument
        selector={{ _id: 'b' }}
        message="Find document"
        expected={['loading', 'not found', 'created']}
      />
    </>
  );
}
