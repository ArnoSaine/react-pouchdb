import { flow } from 'lodash';
import renderProps from './renderProps';
import useGet from './useGet';

export default renderProps(flow([useGet, doc => ({ doc })]), {
  callee: '<Get />',
  example: '<Get db={name|options} ... />'
});
