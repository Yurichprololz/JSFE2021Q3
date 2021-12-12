import noUiSlider, { target } from "nouislider";
import { updateCards } from "./card";
///get element
const sliders = document.querySelectorAll(".filter__range-input") as unknown as target[];
const rangeOption = [
  [1, 12],
  [1940, new Date().getFullYear()],
];
const stepOption = [1, 10];
const copyRange = document.getElementById("range-copy") as target;
const yearsRange = document.getElementById("range-years") as target;

const inputsCopy = document.querySelectorAll(".nouiinput__copies_input") as unknown as HTMLInputElement[];
const inputsYears = document.querySelectorAll(".nouiinput__years_input") as unknown as HTMLInputElement[];

///handle function
const setNumbfromCopy = (values: (string | number)[], handle: number, unencoded: number[]) => {
  inputsCopy[handle].value = String(Math.round(unencoded[handle]));
  updateCards();
};
const setNumbfromYears = (values: (string | number)[], handle: number, unencoded: number[]) => {
  updateCards();
  inputsYears[handle].value = String(Math.round(unencoded[handle]));
};

/// init slider and add event
sliders.forEach((slider, index) => {
  noUiSlider.create(slider, {
    start: [...rangeOption[index]],
    connect: true,
    range: {
      min: rangeOption[index][0],
      max: rangeOption[index][1],
    },
    step: stepOption[index],
  });
});

if (copyRange.noUiSlider) {
  copyRange.noUiSlider.on("update", setNumbfromCopy);
}
if (yearsRange.noUiSlider) {
  yearsRange.noUiSlider.on("update", setNumbfromYears);
}
inputsCopy.forEach((input, index) => {
  input.addEventListener("change", () => {
    const arr: (number | string)[] = ["null", "null"];
    arr[index] = input.value;
    copyRange.noUiSlider?.set(arr);
  });
});
inputsYears.forEach((input, index) => {
  input.addEventListener("change", () => {
    const arr: (number | string)[] = ["null", "null"];
    arr[index] = input.value;
    yearsRange.noUiSlider?.set(arr);
  });
});
