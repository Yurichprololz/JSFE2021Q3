import { saveFavorite } from "./card";

type MyArray<T> = T[];

const saveColor = (): MyArray<boolean> => {
  const filters = document.querySelectorAll(".filter__color-btn") as unknown as HTMLDivElement[];
  const arr: boolean[] = [];
  filters.forEach((filter) => {
    if (filter.classList.contains("active")) {
      arr.push(true);
    } else {
      arr.push(false);
    }
  });
  return arr;
};

const saveForm = (): MyArray<boolean> => {
  const filters = document.querySelectorAll(".filter__form-card") as unknown as HTMLDivElement[];
  const arr: boolean[] = [];
  filters.forEach((filter) => {
    if (filter.classList.contains("active_form")) {
      arr.push(true);
    } else {
      arr.push(false);
    }
  });
  return arr;
};

const saveSize = (): MyArray<boolean> => {
  const filters = document.querySelectorAll(".filter__checkbox") as unknown as HTMLInputElement[];
  const arr: boolean[] = [];
  filters.forEach((filter) => {
    if (filter.checked) {
      arr.push(true);
    } else {
      arr.push(false);
    }
  });
  return arr;
};

const saveSort = () => {
  const sort = document.getElementById("sort") as HTMLSelectElement;
  return sort.value;
};

const saveCopies = (): MyArray<string> => {
  const filters = document.querySelectorAll(".nouiinput__copies_input") as unknown as HTMLInputElement[];
  return [filters[0].value, filters[1].value];
};

const saveYears = (): MyArray<string> => {
  const filters = document.querySelectorAll(".nouiinput__years_input") as NodeListOf<HTMLInputElement>;
  return [filters[0].value, filters[1].value];
};

const saveSetting = (): void => {
  localStorage.setItem("color", JSON.stringify(saveColor()));
  localStorage.setItem("form", JSON.stringify(saveForm()));
  localStorage.setItem("size", JSON.stringify(saveSize()));
  localStorage.setItem("sort", saveSort());
  localStorage.setItem("copies", JSON.stringify(saveCopies()));
  localStorage.setItem("years", JSON.stringify(saveYears()));
  localStorage.setItem("favorite", JSON.stringify(saveFavorite()));
};

export { saveSetting };
