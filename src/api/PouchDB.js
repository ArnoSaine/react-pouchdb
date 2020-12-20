export function createPouchDB({ DBContext, useDBInstance }) {
  return function PouchDB({ children, ...options }) {
    return (
      <DBContext.Provider value={useDBInstance(options)}>
        {children}
      </DBContext.Provider>
    );
  };
}
