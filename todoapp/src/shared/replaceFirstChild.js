export default function replaceFirstChild(newChild) {
  const { firstChild } = this;
  if (firstChild) {
    this.replaceChild(newChild, firstChild);
  } else {
    this.appendChild(newChild);
  }
}
