import { renderToysPage } from "./toysPage";

const renderMainPage = (): void => {
  const main = document.getElementById("main") as HTMLElement;
  main.innerHTML = `
  <div class="intro">
        <h3 class="title intro__title">
          Помоги своей бабушке нарядить Рождественскую ёлку
        </h3>
        <button class="button button_start intro__button" id="start">Старт</button>
      </div>`;
  afterRenderMainPage();
};
const afterRenderMainPage = () => {
  const start = document.getElementById("start") as Element;
  start.addEventListener("click", renderToysPage);
};

export { renderMainPage };
