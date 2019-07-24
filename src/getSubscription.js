import createStore from './utils/createStore';
import createSubscription from './createSubscription';

const store = createStore();

export default function getSubscription(db, key, subscribe) {
  return store([db, key], remove => [createSubscription(subscribe, remove)])[0];
}
