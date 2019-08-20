import { parse } from '@babel/parser';

export default jsx =>
  parse(jsx, {
    plugins: ['jsx']
  });
