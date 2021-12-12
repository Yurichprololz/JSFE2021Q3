export default function createElement(
  tag: string,
  classList?: string,
  attributes?: object
) {
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
