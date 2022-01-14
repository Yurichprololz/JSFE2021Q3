import { createElement, clearElement } from "./utils";

type Tdata = {
  class: String;
  color: String;
  textButton: String;
};

const DATA_WITH_LINE = {
  create: {
    class: "control-panel__create",
    color: "#e66465",
    textButton: "create",
  },
  update: {
    class: "control-panel__update",
    color: "#f6b73c",
    textButton: "update",
  },
};

const renderGarage = (): void => {
  const main = document.getElementById("main") as HTMLElement | null;
  const controlPanel = createControlPanel() as HTMLDivElement;
  const race = createRace();

  if (main) {
    clearElement(main);
    main?.append(controlPanel);
    main?.append(race);
  }
};

const createControlPanel = (): HTMLDivElement => {
  const element = document.createElement("div");
  element.classList.add("control-panel");
  const lineCreate: HTMLDivElement = createInputsLine(DATA_WITH_LINE.create);
  const lineUpdate: HTMLDivElement = createInputsLine(DATA_WITH_LINE.update);
  const groupButtons: HTMLDivElement = createGroupButtons();

  element.append(lineCreate);
  element.append(lineUpdate);
  element.append(groupButtons);
  return element;
};

const createInputsLine = (data: Tdata): HTMLDivElement => {
  const element = document.createElement("div");
  element.className = "input-group mb-1 " + data.class;
  element.innerHTML = `
    <input  type="text"
            class="form-control control-panel__text"
            placeholder="Name of car"
            aria-label="Name of car"
            aria-describedby="basic-addon2"
          />
          <input type="color" class="control-panel__color" value="${data.color}" name="" id="" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary control-panel__button" type="button">${data.textButton}</button>
          </div>
          `;
  return element;
};

const createGroupButtons = (): HTMLDivElement => {
  const element = document.createElement("div");
  element.className = "btn-group control-panel__buttons";
  element.setAttribute("role", "group");
  element.setAttribute("aria-label", "group buttons");
  element.innerHTML = `
        <button type="button" class="btn btn-dark control-panel__button">race</button>
        <button type="button" class="btn btn-dark control-panel__button">reset</button>
        <button type="button" class="btn btn-dark control-panel__button">generate car</button>`;

  return element;
};

const createRace = (): HTMLElement => {
  const element = createElement("div", "race");
  const title = createElement("h2", "race__title");
  const page = createElement("h3", "race__page");
  const content = createElement("div", "race__content", { id: "race" });

  title.textContent = "Garage";
  page.textContent = "Page #";

  element.append(title);
  element.append(page);
  element.append(content);
  console.log(element);

  // <h2 class="race__title">Garage</h2>
  //       <h3 class="race__page">Page #</h3>
  //       <div class="race__content" id="race"></div>
  return element;
};

export { renderGarage };
