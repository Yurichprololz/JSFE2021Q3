import { updateCards } from "./card";

const listenerForColorFilters = () => {
  const filters = document.querySelectorAll(".filter__color-btn") as unknown as HTMLElement[];
  filters.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active");
      updateCards();
    });
  });
};

export { listenerForColorFilters };
