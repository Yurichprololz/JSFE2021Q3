import { updateCards } from "./card";

const listenerForFormFilters = (): void => {
  const filters = document.querySelectorAll(".filter__form-card") as unknown as HTMLElement[];

  filters.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active_form");
      updateCards();
    });
  });
};

export { listenerForFormFilters };
