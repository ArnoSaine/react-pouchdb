export default fn => () =>
  new Promise(resolve =>
    fn(
      () =>
        do {
          resolve();
          null;
        }
    )
  );
