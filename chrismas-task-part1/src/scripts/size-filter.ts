import { updateCards } from "./card";

const listenerForSizeFilters = () => {
  const filters = document.querySelectorAll(".filter__checkbox") as unknown as HTMLElement[];
  filters.forEach((el) => {
    el.addEventListener("click", updateCards);
  });
};
export { listenerForSizeFilters };
