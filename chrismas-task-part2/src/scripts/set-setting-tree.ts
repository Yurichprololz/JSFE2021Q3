import { getCoords } from "./change-tree";

const setFon = (): void => {
  const fon = document.querySelector(".tree") as HTMLDivElement;
  if (localStorage.getItem("fonSrc")) {
    const img = new Image();
    img.src = localStorage.getItem("fonSrc") as string;
    img.onload = () => {
      fon.style.backgroundImage = `url(${img.src})`;
    };
  }
};

const setTree = (): void => {
  const tree = document.getElementById("tree") as HTMLImageElement;
  if (localStorage.getItem("treeSrc")) {
    const img = new Image();
    img.src = localStorage.getItem("treeSrc") as string;
    img.onload = () => {
      tree.src = `${img.src}`;
    };
    const area = document.getElementById("area") as HTMLAreaElement;
    const index = Number(localStorage.getItem("treeArea"));
    area.coords = getCoords(index);
  }
};

const setSnowfall = (): void => {
  const fall: string | null = localStorage.getItem("snowfall");
  if (!fall) return;
  const isFall = fall == "true" ? true : false;
  if (isFall) {
    const button = document.getElementById("showfall-btn") as HTMLDivElement;
    button.click();
  }
};
const startPlay = (): void => {
  const button = document.getElementById("audio-btn") as HTMLDivElement;
  button.click();
  window.removeEventListener("click", startPlay);
};
const setAudio = (): void => {
  const audio: string | null = localStorage.getItem("play-audio");
  if (!audio) return;
  const isPlay = audio == "true" ? true : false;
  if (isPlay) {
    window.addEventListener("click", startPlay);
  }
};

const setSetting = (): void => {
  setFon();
  setTree();
  setSnowfall();
  setAudio();
};

export { setSetting };
