export default fn => {
  let processing;
  return async function queued(...args) {
    // 2.b. Overwrite current processing indicator with a promise that resolves after current processing has completed
    processing = (async () => {
      // 1. Wait until possible previous process has been resolved
      await processing;
      // 2.a. Process this request and return response
      return this::fn(...args);
    })();
    // 3. Return promise that resolves to response from fn call with current args
    return processing;
  };
};
