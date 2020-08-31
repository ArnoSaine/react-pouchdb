import renderProps from '../renderProps';

export default renderProps(rows => ({ rows }), {
  callee: '<AllDocs>',
  example: '<AllDocs db={name|options} ... />'
});
