import { renderToysPage } from "./toysPage";
import { renderTreePage } from "./tree-page";

const renderMainPage = (): void => {
  const main = document.getElementById("main") as HTMLElement;
  if (main.classList.contains("main_toys")) {
    main.classList.remove("main_toys");
  }
  main.innerHTML = `
  <div class="intro">
        <h3 class="title intro__title">
          Помоги своей бабушке нарядить Рождественскую ёлку
        </h3>
        <button class="button button_start intro__button" id="start">Старт</button>
      </div>`;
  afterRenderMainPage();
};
const afterRenderMainPage = (): void => {
  const start = document.getElementById("start") as Element;
  start.addEventListener("click", renderToysPage);
};

const navListerner = (): void => {
  const startPage = document.getElementById("main-page-btn") as HTMLDivElement;
  startPage.addEventListener("click", renderMainPage);

  const toysPage = document.getElementById("toys-page-btn") as HTMLLinkElement;
  toysPage.addEventListener("click", (e: Event) => {
    renderToysPage();
    e.preventDefault(); //I wouldn't like to see hash at url
  });

  const treePage = document.getElementById("tree-page-btn") as HTMLLinkElement;
  treePage.addEventListener("click", (e: Event) => {
    renderTreePage();
    e.preventDefault(); //I wouldn't like to see hash at url
  });
};
export { renderMainPage, navListerner };
