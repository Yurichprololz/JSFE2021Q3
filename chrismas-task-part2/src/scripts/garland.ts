import createEl from "./template";

const galrlandHandle = (e: Event) => {
  const garland = document.getElementById("garland") as HTMLDivElement;
  garland.innerHTML = "";
  const target = e.target as HTMLButtonElement;
  const color = target.dataset.color as string;
  const heightArr = [100, 170, 230, 300, 380, 470, 550];
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
const buttonG = document.querySelectorAll(".garland-wrap__button") as unknown as HTMLButtonElement[];
buttonG.forEach((element) => {
  element.addEventListener("click", galrlandHandle);
});
