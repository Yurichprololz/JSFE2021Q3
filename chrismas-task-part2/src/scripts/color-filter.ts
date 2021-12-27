import { updateCards } from "./card";

const listenerForColorFilters = (): void => {
  const filters = document.querySelectorAll(".filter__color-btn") as NodeListOf<HTMLElement>;

  filters.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active");
      updateCards();
    });
  });
};

export { listenerForColorFilters };
