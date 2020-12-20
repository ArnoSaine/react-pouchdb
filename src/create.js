import { useAsync as useAsyncDefault } from '@postinumero/use-async';
import create from './api/create/main.js';

export default (
  PouchDBConstructor,
  loadingState = false,
  useAsync = useAsyncDefault
) =>
  create({
    PouchDBConstructor,
    useAsync,
    loadingState,
  });
