import { updateCards, showFavorite } from "./card";

const listenerForSizeFilters = (): void => {
  const filters = document.querySelectorAll(".filter__checkbox") as NodeListOf<HTMLElement>;

  filters.forEach((el) => {
    if (el.id != "favorite") {
      el.addEventListener("click", updateCards);
    } else {
      el.addEventListener("click", showFavorite);
    }
  });
};
export { listenerForSizeFilters };
