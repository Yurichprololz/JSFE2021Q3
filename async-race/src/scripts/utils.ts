interface TheObject {
  [key: string]: string;
}

function createElement<T>(tag: T, classList?: T, atr?: TheObject): HTMLElement {
  const el = document.createElement(`${tag}`);
  if (classList) {
    el.className = `${classList}`;
  }
  if (atr) {
    for (let key in atr) {
      el.setAttribute(`${key}`, `${atr[key]}`);
    }
  }

  return el;
}

const clearElement = (element: Element) => {
  element.innerHTML = "";
};
export { createElement, clearElement };
