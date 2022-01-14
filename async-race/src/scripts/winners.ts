import { createElement, clearElement } from "./utils";

const renderWinners = (): void => {
  const main = document.getElementById("main") as HTMLElement | null;
  const winners = createWinners();
  if (main) {
    clearElement(main);
    main.append(winners);
  }
};

const createWinners = (): HTMLElement => {
  const element = createElement("div", "winners");
  const title = createElement("h2", "winners__title");
  const page = createElement("h3", "winners__page");

  title.textContent = "Winners";
  page.textContent = "Page#";

  const table = createElement("table", "table table-dark table-striped");
  table.innerHTML = `
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody >
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
`;

  element.append(title);
  element.append(page);
  element.append(table);
  return element;
};

export { renderWinners };
