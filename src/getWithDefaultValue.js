export default function getWithDefaultValue(key, getDefaultValue) {
  return this.has(key)
    ? this.get(key)
    : do {
        const defaultValue = getDefaultValue();
        this.set(key, defaultValue);
        defaultValue;
      };
}
