import noUiSlider, { target } from "nouislider";
import { updateCards } from "./card";

type v<T> = T;

export default function init(): void {
  const sliders = document.querySelectorAll(".filter__range-input") as NodeListOf<target>;
  const rangeOption = [
    [1, 12],
    [1940, new Date().getFullYear()],
  ];
  const stepOption = [1, 10];
  const copyRange = document.getElementById("range-copy") as target;
  const yearsRange = document.getElementById("range-years") as target;

  const inputsCopy = document.querySelectorAll(".nouiinput__copies_input") as NodeListOf<HTMLInputElement>;
  const inputsYears = document.querySelectorAll(".nouiinput__years_input") as NodeListOf<HTMLInputElement>;

  ///handle function
  const setNumbfromCopy = (values: (string | number)[], handle: number, unencoded: number[]) => {
    inputsCopy[handle].value = String(Math.round(unencoded[handle]));
    updateCards();
  };
  const setNumbfromYears = (values: v<string | number>[], handle: number, unencoded: number[]) => {
    inputsYears[handle].value = String(Math.round(unencoded[handle]));
    updateCards();
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
      const arr: string[] = ["null", "null"];
      arr[index] = input.value;
      copyRange.noUiSlider?.set(arr);
    });
  });
  inputsYears.forEach((input, index) => {
    input.addEventListener("change", () => {
      const arr: string[] = ["null", "null"];
      arr[index] = input.value;
      yearsRange.noUiSlider?.set(arr);
    });
  });
}
