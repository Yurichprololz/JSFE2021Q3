interface TheObject {
  [key: string]: string;
}

function createElement<T>(tag: T, classList?: T, atr?: TheObject): HTMLElement {
  const el = document.createElement(`${tag}`);
  if (classList) {
    el.className = `${classList}`;
  }
  if (atr) {
    const [key] = Object.entries(atr);
    key.forEach((k) => {
      el.setAttribute(`${k}`, `${atr[k]}`);
    });
  }
  return el;
}

const clearElement = (element: HTMLElement) => {
  const child = Array.from(element.childNodes);
  child.forEach((elem) => {
    elem.remove();
  });
};

const genRandonElemOfArray = <T>(arr:T[]):T => arr[Math.floor(Math.random() * arr.length)];

const createImage = (src:string, clas:string):HTMLImageElement => {
  const img = new Image();
  img.className = clas;
  img.src = src;
  return img;
};

export {
  createElement, clearElement, genRandonElemOfArray, createImage,
};
