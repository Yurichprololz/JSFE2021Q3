export default function createElement<T>(tag: T, classList?: T): HTMLElement {
  const el = document.createElement(`${tag}`);
  if (classList) {
    el.classList.add(`${classList}`);
  }
  return el;
}
