import createEl from "./template";

const galrlandHandle = (e: Event): void => {
  const garland = document.getElementById("garland") as HTMLDivElement;
  garland.innerHTML = "";
  const target = e.target as HTMLButtonElement;
  const color = target.dataset.color as string;
  localStorage.setItem("garland", color);
  const tree = document.getElementById("tree") as HTMLImageElement;
  const height = tree.offsetHeight;
  // I took offsetHeight and multiplied by percents for responsible layout
  const heightArr = [
    height * 0.15,
    height * 0.25,
    height * 0.35,
    height * 0.45,
    height * 0.6,
    height * 0.75,
    height * 0.9,
  ];

  const degreeArr = [12, 10, 8, 6, 4, 3.5, 3];
  heightArr.forEach((el, index) => {
    createLine(heightArr[index], degreeArr[index], color);
  });
};
const createLine = (height: number, increaseDegree: number, color: string): void => {
  const garland = document.getElementById("garland") as HTMLDivElement | null;
  const list = createEl<string>("ul", "garland__line") as HTMLUListElement;
  list.style.height = height + "px";
  list.style.width = height + "px";
  let degree = 55;
  while (degree < 125) {
    const li = createEl<string>("li", "garland__lamp") as HTMLLIElement;
    li.classList.add(`garland__lamp_${color}`);

    li.style.transform = `rotate(
        ${degree}deg) translateY(${height / 2}px) rotate(
            -${degree}deg`;

    degree += increaseDegree;
    list.append(li);
  }
  if (garland) garland.append(list);
};

const garlandListerner = (): void => {
  const buttonG = document.querySelectorAll(".garland-wrap__button") as NodeListOf<HTMLButtonElement>;
  buttonG.forEach((element) => {
    element.addEventListener("click", galrlandHandle);
  });
  const nullGarland = document.querySelector(".garland-wrap__button_null") as HTMLButtonElement;
  nullGarland.addEventListener("click", () => {
    const garland = document.getElementById("garland") as HTMLDivElement;
    garland.innerHTML = "";
  });
};
export { garlandListerner };
