import { setFavorite } from "./card";

const setColor = () => {
  const set = localStorage.getItem("color");
  let setting: boolean[];
  if (set) {
    setting = JSON.parse(set);
  } else {
    return;
  }
  const filters = document.querySelectorAll(".filter__color-btn") as unknown as HTMLDivElement[];
  setting.forEach((value, index) => {
    if (value) {
      filters[index].click();
    }
  });
};

const setForm = () => {
  const set = localStorage.getItem("form");
  let setting: boolean[];
  if (set) {
    setting = JSON.parse(set);
  } else {
    return;
  }
  const filters = document.querySelectorAll(".filter__form-card") as unknown as HTMLDivElement[];
  setting.forEach((value, index) => {
    if (value) {
      filters[index].click();
    }
  });
};

const setCopies = () => {
  const set = localStorage.getItem("copies");
  let setting: string[];
  if (set) {
    setting = JSON.parse(set);
  } else {
    return;
  }
  const filters = document.querySelectorAll(".nouiinput__copies_input") as unknown as HTMLInputElement[];
  const change = new Event("change");
  setting.forEach((value, index) => {
    if (value) {
      filters[index].value = setting[index];
      filters[index].dispatchEvent(change);
    }
  });
};

const setYears = () => {
  const set = localStorage.getItem("years");
  let setting: string[];
  if (set) {
    setting = JSON.parse(set);
  } else {
    return;
  }
  const filters = document.querySelectorAll(".nouiinput__years_input") as unknown as HTMLInputElement[];
  const change = new Event("change");
  setting.forEach((value, index) => {
    if (value) {
      filters[index].value = setting[index];
      filters[index].dispatchEvent(change);
    }
  });
};

const setSort = () => {
  const sort = document.getElementById("sort") as HTMLSelectElement;
  const setting: string | null = localStorage.getItem("sort");
  if (!setting) return;
  sort.value = setting;

  const event = new Event("change");
  sort.dispatchEvent(event);
};

const setSize = () => {
  const set = localStorage.getItem("size");
  let setting: boolean[];
  if (set) {
    setting = JSON.parse(set);
  } else {
    return;
  }
  const filters = document.querySelectorAll(".filter__checkbox") as unknown as HTMLInputElement[];
  setting.forEach((value, index) => {
    if (value) {
      filters[index].click();
    }
  });
};

const setSetting = () => {
  if (localStorage.getItem("color")) {
    setColor();
  }
  if (localStorage.getItem("form")) {
    setForm();
  }
  if (localStorage.getItem("copies")) {
    setCopies();
  }
  if (localStorage.getItem("years")) {
    setYears();
  }
  if (localStorage.getItem("size")) {
    setSize();
  }
  if (localStorage.getItem("sort")) {
    setSort();
  }
  if (localStorage.getItem("favorite")) {
    setFavorite();
  }
};

export { setSetting };
