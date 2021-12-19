import { updateCards, showFavorite } from "./card";

const listenerForSizeFilters = () => {
  const filters = document.querySelectorAll(".filter__checkbox") as unknown as HTMLElement[];
  filters.forEach((el) => {
    if (el.id != "favorite") {
      el.addEventListener("click", updateCards);
    } else {
      el.addEventListener("click", showFavorite);
    }
  });
};
export { listenerForSizeFilters };
