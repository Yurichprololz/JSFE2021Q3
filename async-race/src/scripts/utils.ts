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

const clearElement = (element: HTMLElement):void => {
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

const msConvertToSec = (ms:number | string):number => {
  const msNum = Number(ms);
  const value = Number((msNum / 1000).toFixed(2));
  return value;
};

export {
  createElement, clearElement, genRandonElemOfArray, createImage, msConvertToSec,
};
