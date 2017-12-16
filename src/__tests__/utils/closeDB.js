export default fn => () =>
  new Promise(resolve =>
    fn(
      db =>
        do {
          db.close().then(resolve);
          null;
        }
    )
  );
