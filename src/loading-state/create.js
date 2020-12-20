import { useAsync as useAsyncDefault } from '@postinumero/use-async/loading-state';
import create from '../api/create/main.js';

export default (
  PouchDBConstructor,
  loadingState = true,
  useAsync = useAsyncDefault
) =>
  create({
    PouchDBConstructor,
    useAsync,
    loadingState,
  });
