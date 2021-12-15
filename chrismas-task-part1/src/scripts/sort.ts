import { updateCards, sort, showFavorite } from "./card";

const select = document.getElementById("sort") as HTMLSelectElement;
select.addEventListener("change", sort);
const favorite = document.getElementById("favorite");
favorite?.addEventListener("change", (e: Event) => {
  const favorite = e.target as HTMLInputElement;
  if (favorite.checked) {
    showFavorite();
  } else {
    updateCards();
  }
});
