export default function createElement<T>(tag: T, classList?: T, attributes?: object) {
  const el = document.createElement(`${tag}`);
  if (classList) {
    el.classList.add(`${classList}`);
  }
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
  }
  return el;
}
