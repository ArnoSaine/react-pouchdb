import flow from 'lodash/flow';
import renderProps from './renderProps';
import useFind from './useFind';

export default renderProps(flow([useFind, docs => ({ docs })]), {
  callee: '<Find />',
  example: '<Find db={name|options} ... />'
});
