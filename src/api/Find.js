import flow from 'lodash/flow';
import renderProps from '../renderProps';

export default useFind =>
  renderProps(flow([useFind, docs => ({ docs })]), {
    callee: '<Find>',
    example: '<Find db={name|options} ... />'
  });
