import { renderGarage } from "./garage";
import { renderWinners } from "./winners";

const renderBasicLayout = (): void => {
  const footer = createFooter();
  const main = createMain();

  document.body.append(footer);
  document.body.append(main);
};

const createFooter = (): HTMLElement => {
  const element = document.createElement("footer");
  element.classList.add("footer");
  element.innerHTML = `
    <button class="footer__page btn btn-primary" id="garage-btn">to garage</button>
    <button class="footer__page btn btn-primary" id="winners-btn">to winners</button>`;

  listernerForNav(element);
  return element;
};

const listernerForNav = (footer: HTMLElement): void => {
  const children = footer.children as HTMLCollection;

  const garage = children.namedItem("garage-btn");
  const winners = children.namedItem("winners-btn");

  if (garage && winners) {
    garage.addEventListener("click", renderGarage);
    winners.addEventListener("click", renderWinners);
  }
};

const createMain = (): HTMLElement => {
  const element = document.createElement("main");
  element.classList.add("main");
  element.id = "main";
  return element;
};

export { renderBasicLayout };
