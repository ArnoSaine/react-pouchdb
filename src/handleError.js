export default function handleError([error, data] = []) {
  if (error) {
    throw error;
  }
  return data;
}
