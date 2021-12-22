import { updateCards } from "./card";
import { target } from "nouislider";

const resetSearch = (): void => {
  const search = document.getElementById("search") as HTMLInputElement;
  search.value = "";
};

const resetFormFilters = (): void => {
  const filters = document.querySelectorAll(".filter__form-card") as unknown as HTMLDivElement[];
  filters.forEach((filter) => {
    if (filter.classList.contains("active_form")) {
      filter.classList.remove("active_form");
    }
  });
};

const resetColorFilters = (): void => {
  const filters = document.querySelectorAll(".filter__color-btn") as unknown as HTMLDivElement[];
  filters.forEach((filter) => {
    if (filter.classList.contains("active")) {
      filter.classList.remove("active");
    }
  });
};

const resetSizeFilters = (): void => {
  const filters = document.querySelectorAll(".filter__checkbox") as unknown as HTMLInputElement[];
  filters.forEach((filter) => {
    if (filter.checked) {
      filter.click();
    }
  });
};

const resetNoUiSlider = (): void => {
  const sliders = document.querySelectorAll(".filter__range-input") as unknown as target[];
  const rangeOption = [
    [1, 12],
    [1940, new Date().getFullYear()],
  ];

  sliders.forEach((slider, index) => {
    slider.noUiSlider?.set(rangeOption[index]);
  });
};
const resetFilters = (): void => {
  resetSearch();
  resetFormFilters();
  resetColorFilters();
  resetSizeFilters();
  resetNoUiSlider();
  updateCards();
};

export { resetFilters };
