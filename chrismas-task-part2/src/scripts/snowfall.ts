import createElement from "./template";

const snowfall = (): void => {
  const fon = document.querySelector(".tree") as HTMLDivElement;
  const snowfall = createElement<string>("div", "snowfall__block");
  fon.append(snowfall);

  const interval = setInterval(() => {
    snowfall.append(createSnow(snowfall.offsetWidth));
  }, 50);
  setTimeout(() => clearInterval(interval), 8000);
};

const createSnow = (width: number): HTMLElement => {
  const snow = createElement<string>("div", "snow");
  snow.style.left = Math.random() * (width + 250) - 250 + "px";
  return snow;
};

const snowfallListerner = (): void => {
  const button = document.getElementById("showfall-btn") as HTMLDivElement;
  button.addEventListener("click", () => {
    button.classList.toggle("snowfall_active");
    if (button.classList.contains("snowfall_active")) {
      snowfall();
      localStorage.setItem("snowfall", "true");
    } else {
      localStorage.setItem("snowfall", "false");
      const block = document.querySelector(".snowfall__block") as Element | null;
      if (block) block.remove();
    }
  });
};
export { snowfallListerner };
