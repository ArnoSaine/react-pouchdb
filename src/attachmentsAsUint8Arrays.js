const blobToUint8Array = blob =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result));
    reader.readAsArrayBuffer(blob);
  });

export default typeof global === 'object' && global.Buffer
  ? x => x
  : async function attachmentsAsUint8Arrays(attachments) {
      const result = {};
      for (const [name, { data }] of Object.entries(attachments)) {
        result[name] = await blobToUint8Array(data);
      }
      return result;
    };
