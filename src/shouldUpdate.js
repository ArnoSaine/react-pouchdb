import isEqual from 'lodash/isEqual';
import { omit } from './renderProps';

export default (a, b) => !isEqual(omit(a), omit(b));
