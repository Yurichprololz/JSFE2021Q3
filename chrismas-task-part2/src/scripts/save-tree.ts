import { DragNDrop } from "./tree-page";
import { setSettingForButton } from "./set-setting-tree";

const saveTree = (): void => {
  const wrap = document.getElementById("wrap-toys") as HTMLDivElement;
  const dragToys = document.getElementById("toys-conteiner") as HTMLDivElement;
  const tree = document.querySelector(".tree") as HTMLDivElement;

  const count = tree.dataset.count;

  localStorage.setItem(`wrap${count}`, `${wrap.innerHTML}`);
  localStorage.setItem(`dragToys${count}`, `${dragToys.innerHTML}`);
  localStorage.setItem(`tree${count}`, `${tree.innerHTML}`);
  localStorage.setItem(`play-audio${count}`, `${checkVolume()}`);
  localStorage.setItem(`snowfall${count}`, `${checkShowfall()}`);
  setSaveTreeListerner();
};

const removeSnowfall = (): void => {
  const snowfall = document.querySelector(".snowfall__block") as HTMLDivElement;
  snowfall.remove();
};

const checkVolume = (): boolean => {
  const button = document.querySelector(".volume") as HTMLButtonElement;
  return button.classList.contains("volume_active");
};
const checkShowfall = (): boolean => {
  const button = document.querySelector(".snowfall") as HTMLButtonElement;
  return button.classList.contains("snowfall_active");
};

const saveTreeListerner = (): void => {
  const button = document.getElementById("save") as HTMLButtonElement;
  button.addEventListener("click", saveTree);
};

const setSaveTree = <T>(count: T): void => {
  const wrap = document.getElementById("wrap-toys") as HTMLDivElement;
  const dragToys = document.getElementById("toys-conteiner") as HTMLDivElement;
  const tree = document.querySelector(".tree") as HTMLDivElement;

  wrap.innerHTML = localStorage.getItem(`wrap${count}`) as string;
  dragToys.innerHTML = localStorage.getItem(`dragToys${count}`) as string;
  tree.innerHTML = localStorage.getItem(`tree${count}`) as string;

  if (tree.querySelector(".snowfall__block")) {
    removeSnowfall();
  }
  const area = document.querySelector("area") as HTMLAreaElement;
  area.addEventListener("click", (e: Event) => e.preventDefault());

  const toys = document.querySelectorAll(".setting-right__img") as NodeListOf<HTMLImageElement>;

  toys.forEach((img) => {
    img.draggable = true;
    img.addEventListener("mousedown", DragNDrop);
    img.ondragstart = function (e: Event) {
      e.preventDefault();
    };
  });
  setSettingForButton(count);
  const changeFonButtons = document.querySelectorAll(".fon-wrap__item") as NodeListOf<HTMLDivElement>;
  changeFonButtons[Number(count) - 1].click();
};

const setSaveTreeListerner = (): void => {
  const buttons = document.querySelectorAll(".setting-right__save") as NodeListOf<HTMLDivElement>;
  buttons.forEach((button, index) => {
    if (localStorage.getItem(`tree${index + 1}`)) {
      button.classList.add("setting-right__save_active");
      button.onclick = () => setSaveTree<number>(index + 1);
    } else if (button.classList.contains("setting-right__save_active")) {
      button.classList.remove("setting-right__save_active");
      button.onclick = null;
    }
  });
};

export { saveTreeListerner, setSaveTreeListerner };
