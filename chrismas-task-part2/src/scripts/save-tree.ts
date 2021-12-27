import { DragNDrop } from "./tree-page";
import { setSettingForButton } from "./set-setting-tree";

const saveTree = () => {
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

const checkVolume = (): boolean => {
  const button = document.querySelector(".volume") as HTMLButtonElement;
  return button.classList.contains("volume_active");
};
const checkShowfall = (): boolean => {
  const button = document.querySelector(".snowfall") as HTMLButtonElement;
  return button.classList.contains("snowfall_active");
};

const saveTreeListerner = () => {
  const button = document.getElementById("save") as HTMLButtonElement;
  button.addEventListener("click", saveTree);
};

const setSaveTree = <T>(count: T) => {
  const wrap = document.getElementById("wrap-toys") as HTMLDivElement;
  const dragToys = document.getElementById("toys-conteiner") as HTMLDivElement;
  const tree = document.querySelector(".tree") as HTMLDivElement;

  wrap.innerHTML = localStorage.getItem(`wrap${count}`) as string;
  dragToys.innerHTML = localStorage.getItem(`dragToys${count}`) as string;
  tree.innerHTML = localStorage.getItem(`tree${count}`) as string;

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
};

const setSaveTreeListerner = () => {
  const buttons = document.querySelectorAll(".setting-right__save") as NodeListOf<HTMLDivElement>;
  buttons.forEach((button, index) => {
    if (localStorage.getItem(`tree${index + 1}`)) {
      button.classList.add("setting-right__save_active");
      button.addEventListener("click", () => setSaveTree<number>(index + 1));
    }
  });
};

export { saveTreeListerner, setSaveTreeListerner };
