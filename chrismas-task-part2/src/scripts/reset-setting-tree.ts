const resetSettingTree = () => {
  if (localStorage.getItem("treeSrc")) {
    localStorage.removeItem("treeSrc");
  }
  if (localStorage.getItem("snowfall")) {
    localStorage.removeItem("snowfall");
  }
  if (localStorage.getItem("treeArea")) {
    localStorage.removeItem("treeArea");
  }
  if (localStorage.getItem("fonSrc")) {
    localStorage.removeItem("fonSrc");
  }
  if (localStorage.getItem("play-audio")) {
    localStorage.removeItem("play-audio");
  }
};

const resetSettingListerner = () => {
  const button = document.getElementById("reset-tree") as HTMLButtonElement;
  button.addEventListener("click", resetSettingTree);
};

export { resetSettingListerner };
