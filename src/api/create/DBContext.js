import { createContext } from 'react';
import get from '@postinumero/map-get-with-default';

// DB contexts need to be unique only for each PouchDB implementation.
// Store those in WeakMap.
const contextsMap = new WeakMap();

export default (PouchDBConstructor) =>
  contextsMap::get(PouchDBConstructor, createContext);
