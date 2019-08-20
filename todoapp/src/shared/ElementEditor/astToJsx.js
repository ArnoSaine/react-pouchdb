import generate from '@babel/generator';
import prettier from './prettier';

export default ast => ast |> generate |> (({ code }) => code) |> prettier;
