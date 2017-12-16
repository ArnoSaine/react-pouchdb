import changes, { cache } from '../changesCache';

class DB {
  _activeListenersCount = 0;
  changes() {
    this._activeListenersCount = this._activeListenersCount + 1;
    return {
      on() {},
      removeListener() {},
      cancel: () => {
        this._activeListenersCount = this._activeListenersCount - 1;
      }
    };
  }
}

test('cache map size', () => {
  expect.assertions(4);
  expect(cache.size).toBe(0);
  const db1 = new DB();
  db1::changes({ a: 1 }, () => {});
  expect(cache.size).toBe(1);
  db1::changes({ a: 1 }, () => {});
  expect(cache.size).toBe(1);
  const db2 = new DB();
  db2::changes({ a: 1 }, () => {});
  expect(cache.size).toBe(2);
});

test('add listeners', () => {
  expect.assertions(8);
  const db = new DB();
  expect(db._activeListenersCount).toBe(0);
  db::changes({ a: 1 }, () => {});
  const dbCache = cache.get(db);
  expect(dbCache.get('{"a":1}').count).toBe(1);
  expect(db._activeListenersCount).toBe(1);
  db::changes({ a: 1 }, () => {});
  expect(dbCache.get('{"a":1}').count).toBe(2);
  expect(db._activeListenersCount).toBe(1);
  db::changes({ a: 2 }, () => {});
  expect(dbCache.get('{"a":1}').count).toBe(2);
  expect(dbCache.get('{"a":2}').count).toBe(1);
  expect(db._activeListenersCount).toBe(2);
});

test('remove listeners', () => {
  expect.assertions(7);
  const db = new DB();
  const cancel1 = db::changes({ a: 1 }, () => {});
  expect(db._activeListenersCount).toBe(1);
  const cancel2 = db::changes({ a: 1 }, () => {});
  expect(db._activeListenersCount).toBe(1);
  const dbCache = cache.get(db);
  expect(dbCache.get('{"a":1}').count).toBe(2);
  cancel1();
  expect(dbCache.get('{"a":1}').count).toBe(1);
  expect(db._activeListenersCount).toBe(1);
  cancel2();
  expect(dbCache.get('{"a":1}')).toBe(undefined);
  expect(db._activeListenersCount).toBe(0);
});
