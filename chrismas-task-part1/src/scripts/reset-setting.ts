import { setSetting } from "./set-setting";

const resetSetting = (): void => {
  document.getElementById("reset-setting")?.addEventListener("click", () => {
    const favorite: boolean[] = [];
    favorite.length = 60;
    favorite.fill(false);
    localStorage.setItem("copies", JSON.stringify(["1", "12"]));
    localStorage.setItem("years", JSON.stringify(["1940", "2021"]));
    localStorage.setItem("favorite", JSON.stringify(favorite));
    localStorage.setItem("size", JSON.stringify([false, false, false, false]));
    localStorage.setItem("sort", "name-of-increase");
    localStorage.setItem("color", JSON.stringify([false, false, false, false, false]));
    localStorage.setItem("form", JSON.stringify([false, false, false, false, false]));
    setSetting();
  });
};

export { resetSetting };
