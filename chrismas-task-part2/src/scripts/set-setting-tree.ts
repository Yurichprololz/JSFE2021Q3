const setFon = () => {
  const fon = document.querySelector(".tree") as HTMLDivElement;
  if (localStorage.getItem("fonSrc")) {
    const img = new Image();
    img.src = localStorage.getItem("fonSrc") as string;
    img.onload = () => {
      fon.style.backgroundImage = `url(${img.src})`;
    };
  }
};

const setTree = () => {
  const tree = document.getElementById("tree") as HTMLImageElement;
  if (localStorage.getItem("treeSrc")) {
    const img = new Image();
    img.src = localStorage.getItem("treeSrc") as string;
    img.onload = () => {
      tree.src = `${img.src}`;
    };
  }
};

const setSnowfall = () => {
  const fall: string | null = localStorage.getItem("snowfall");
  if (!fall) return;
  const isFall = fall == "true" ? true : false;
  if (isFall) {
    const button = document.getElementById("showfall-btn") as HTMLDivElement;
    button.click();
  }
};
const startPlay = () => {
  const button = document.getElementById("audio-btn") as HTMLDivElement;
  button.click();
  window.removeEventListener("click", startPlay);
};
const setAudio = () => {
  const audio: string | null = localStorage.getItem("play-audio");
  if (!audio) return;
  const isPlay = audio == "true" ? true : false;
  if (isPlay) {
    window.addEventListener("click", startPlay);
  }
};

const setSetting = () => {
  setFon();
  setTree();
  setSnowfall();
  setAudio();
};

export { setSetting };
