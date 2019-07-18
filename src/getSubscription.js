import createSubscription from './createSubscription';
import createStore from './createStore';

const store = createStore();

export default function getSubscription(db, key, subscribe) {
  return store([db, key], remove => [createSubscription(subscribe, remove)])[0];
}
