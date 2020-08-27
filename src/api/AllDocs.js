import renderProps from '../renderProps';

export default renderProps(doc => ({ doc }), {
  callee: '<AllDocs>',
  example: '<AllDocs db={name|options} ... />'
});
