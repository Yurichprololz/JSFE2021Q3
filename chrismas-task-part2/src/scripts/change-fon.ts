const changeFonHandle = (e: Event): void => {
  const fon = document.querySelector(".tree") as HTMLDivElement;
  let target = e.target as HTMLDivElement;
  target = target.closest("div") as HTMLDivElement;
  const img = new Image();
  img.src = `../assets/images/bg/${target.dataset.path}.jpg`;
  localStorage.setItem("fonSrc", img.src);
  img.onload = () => {
    fon.style.backgroundImage = `url(${img.src})`;
  };
};

const changeFonListerner = () => {
  const button1 = document.querySelectorAll(".fon-wrap__item") as unknown as HTMLDivElement[];
  button1.forEach((element) => {
    element.addEventListener("click", changeFonHandle);
  });
};
export { changeFonListerner };
