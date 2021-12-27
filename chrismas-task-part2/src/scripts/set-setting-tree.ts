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
  const treeWrap = tree.parentNode as HTMLDivElement;
  if (localStorage.getItem("treeSrc")) {
    const img = new Image();
    img.src = localStorage.getItem("treeSrc") as string;
    img.onload = () => {
      tree.src = `${img.src}`;
    };
    const area = document.getElementById("area") as HTMLAreaElement;
    const index = Number(localStorage.getItem("treeArea"));
    area.coords = getCoords(index);
    const count = localStorage.getItem("count") as string;
    treeWrap.dataset.count = count;
  }
};

const setSnowfall = (count?: number): void => {
  const fall: string | null = !count ? localStorage.getItem("snowfall") : localStorage.getItem(`snowfall${count}`);
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

const setAudio = (count?: number): void => {
  console.log(count);

  const audio: string | null = !count ? localStorage.getItem("play-audio") : localStorage.getItem(`play-audio${count}`);
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
  setTimeout(setAudio, 0);
};

const creanButtons = (): void => {
  const audio = document.getElementById("audio-btn") as HTMLDivElement;
  const showfall = document.getElementById("showfall-btn") as HTMLDivElement;
  if (audio.classList.contains("volume_active")) {
    audio.classList.remove("volume_active");
  }
  if (showfall.classList.contains("snowfall_active")) {
    showfall.classList.remove("snowfall_active");
  }
};

const setSettingForButton = <T>(count: T): void => {
  creanButtons();
  if (typeof count == "number") {
    setSnowfall(count);
    setTimeout(() => setAudio(count), 0);
  }
};

export { setSetting, setSettingForButton };
