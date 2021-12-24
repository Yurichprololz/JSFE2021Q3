const changeTreeHandle = (e: Event): void => {
  const tree = document.getElementById("tree") as HTMLImageElement;
  let target = e.target as HTMLDivElement;
  target = target.closest("div") as HTMLDivElement;
  tree.src = `./assets/images/tree/${target.dataset.path}.png`;
  localStorage.setItem("treeSrc", tree.src);
};

const button = document.querySelectorAll(".tree-wrap_tree") as unknown as HTMLDivElement[];
button.forEach((element) => {
  element.addEventListener("click", changeTreeHandle);
});
