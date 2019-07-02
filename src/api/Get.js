import flow from 'lodash/flow';
import renderProps from '../renderProps';

export default useGet =>
  renderProps(flow([useGet, doc => ({ doc })]), {
    callee: '<Get />',
    example: '<Get db={name|options} ... />'
  });
