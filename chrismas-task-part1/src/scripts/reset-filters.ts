import { updateCards } from "./card";
import { target } from "nouislider";

const resetSearch = () => {
  const search = document.getElementById("search") as HTMLInputElement;
  search.value = "";
};

const resetFormFilters = () => {
  const filters = document.querySelectorAll(".filter__form-card") as unknown as HTMLDivElement[];
  filters.forEach((filter) => {
    if (filter.classList.contains("active_form")) {
      filter.classList.remove("active_form");
    }
  });
};

const resetColorFilters = () => {
  const filters = document.querySelectorAll(".filter__color-btn") as unknown as HTMLDivElement[];
  filters.forEach((filter) => {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  });
};

const resetSizeFilters = () => {
  const filters = document.querySelectorAll(".filter__checkbox") as unknown as HTMLInputElement[];
  filters.forEach((filter) => {
    if (filter.checked) {
      filter.click();
    }
  });
};

const resetNoUiSlider = () => {
  const sliders = document.querySelectorAll(".filter__range-input") as unknown as target[];
  const rangeOption = [
    [1, 12],
    [1940, new Date().getFullYear()],
  ];

  sliders.forEach((slider, index) => {
    slider.noUiSlider?.set(rangeOption[index]);
  });
};
const resetFilters = () => {
  resetSearch();
  resetFormFilters();
  resetColorFilters();
  resetSizeFilters();
  resetNoUiSlider();
  updateCards();
};

export { resetFilters };
