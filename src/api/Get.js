import renderProps from '../renderProps';

export default useGet =>
  renderProps((...args) => useGet(...args) |> (doc => ({ doc })), {
    callee: '<Get>',
    example: '<Get db={name|options} ... />'
  });
