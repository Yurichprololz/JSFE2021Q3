import { updateCards } from "./card";

const listenerForFormFilters = (): void => {
  const filters = document.querySelectorAll(".filter__form-card") as NodeListOf<HTMLElement>;

  filters.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active_form");
      updateCards();
    });
  });
};

export { listenerForFormFilters };
