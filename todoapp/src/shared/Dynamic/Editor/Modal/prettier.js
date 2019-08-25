import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babylon';

export default code =>
  prettier.format(code, {
    parser: 'babel',
    plugins: [babylon]
  });
