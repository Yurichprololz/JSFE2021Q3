export const renderMainPage = (): void => {
  const main = document.getElementById("main");
  if (main == null || !("innerHTML" in main)) return;
  main.innerHTML = `
  <div class="intro">
        <h3 class="title intro__title">
          Help your granny decorate the X-max tree
        </h3>
        <button class="button button_start intro__button">Start</button>
      </div>`;
};
