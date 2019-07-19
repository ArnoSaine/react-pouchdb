import renderProps from '../renderProps';

export default useFind =>
  renderProps((...args) => useFind(...args) |> (docs => ({ docs })), {
    callee: '<Find>',
    example: '<Find db={name|options} ... />'
  });
