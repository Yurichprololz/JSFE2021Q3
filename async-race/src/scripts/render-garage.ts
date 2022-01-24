import {
  createElement, clearElement, createImage, validateForInput,
} from './utils';
import {
  getCars, genCars,
  createCustomCar, deleteCar, updateCar, startEngine, requestDrive, checkWinner, LIMIT,
} from './api';
import {
  ICar,
  IEngine,
  IwinRace,
} from './interfaces';
import state from './state';
import alertWinner from './alert-winner';
import createCar from './get-SVG-car';

type Tdata = {
  class: String;
  textButton: String;
};

const DATA_WITH_LINE = {
  create: {
    class: 'control-panel__create',
    textButton: 'create',
  },
  update: {
    class: 'control-panel__update',
    textButton: 'update',
  },
};

const createInputsLine = (data: Tdata): HTMLDivElement => {
  const element = document.createElement('div');
  element.className = `input-group mb-1 ${data.class}`;
  element.innerHTML = `
    <input  type="text"
            class="form-control control-panel__text"
            placeholder="Name of car"
            aria-label="Name of car"
            aria-describedby="basic-addon2"
            id="${data.textButton}-name"
          />
          <input type="color" class="control-panel__color" id="${data.textButton}-clr"/>
            <button class="btn btn-outline-secondary control-panel__button" id="${data.textButton}-btn" ${data.textButton === 'update' ? 'disabled' : ''}  type="button">${data.textButton}</button>
          `;
  return element;
};

const createRaceButtons = (model:HTMLElement):HTMLDivElement => {
  const contiener = createElement('div', 'track__buttons') as HTMLDivElement;
  const contienerEngine = createElement('div', 'track__sm-buttons') as HTMLDivElement;
  const select = createElement('button', 'race__select btn  btn-warning') as HTMLButtonElement;
  const reset = createElement('button', 'race__remove btn btn-warning') as HTMLButtonElement;
  const A = createElement('button', 'race__A btn-outline-danger') as HTMLButtonElement;
  const B = createElement('button', 'race__B btn-outline-danger') as HTMLButtonElement;

  select.textContent = 'select';
  reset.textContent = 'remove';
  A.textContent = 'A';
  B.textContent = 'B';

  B.disabled = true;
  A.addEventListener('click', startedEngine);
  B.addEventListener('click', stoppedCar);
  select.addEventListener('click', addTargetCar);
  reset.addEventListener('click', removeCar);

  contiener.append(select);
  contiener.append(reset);
  contienerEngine.append(A);
  contienerEngine.append(B);
  contienerEngine.append(model);
  contiener.append(contienerEngine);

  return contiener;
};

const createTrack = (car:ICar):HTMLElement => {
  const { name, color, id } = car;
  const track = createElement('div', 'track');
  track.dataset.id = `${id}`;
  const model = createElement('span', 'track__model');
  model.textContent = name;
  const buttons = createRaceButtons(model);
  const imgCar = createCar(color, 'track__car');

  const flagImg = createImage('./assets/img/flag-of-the-finish.png', 'track__flag');

  track.append(buttons);
  track.append(imgCar);
  track.append(flagImg);

  return track;
};

const createRace = async (): Promise<HTMLElement> => {
  const race = createElement('div', 'race');
  const title = createElement('h2', 'race__title');
  const pageTitle = createElement('h3', 'race__page');
  const content = createElement('div', 'race__content', { id: 'race' });

  race.append(title);
  race.append(pageTitle);
  race.append(content);

  const cars = await getCars(state.page);
  const { data, total } = cars;

  title.textContent = `Garage(${total})`;
  pageTitle.textContent = `Page #${state.page}`;

  refreshCount(total);

  const arrTracks = data.map((el) => createTrack(el));

  arrTracks.forEach((track) => {
    content.append(track);
  });

  return race;
};

const addStateDataForInputs = ():void => {
  const createNameInput = document.getElementById('create-name') as HTMLInputElement | null;
  const createColorInput = document.getElementById('create-clr') as HTMLInputElement | null;
  const updateNameInput = document.getElementById('update-name') as HTMLInputElement | null;
  const updateColorInput = document.getElementById('update-clr') as HTMLInputElement | null;

  if (createNameInput) {
    createNameInput.value = state.createName;
  }
  if (createColorInput) {
    createColorInput.value = state.createColor;
  }
  if (updateNameInput) {
    updateNameInput.value = state.updateName;
  }
  if (updateColorInput) {
    updateColorInput.value = state.updateColor;
  }
};

const createControlPanel = (): HTMLDivElement => {
  const element = document.createElement('div');
  element.classList.add('control-panel');
  const lineCreate: HTMLDivElement = createInputsLine(DATA_WITH_LINE.create);
  const lineUpdate: HTMLDivElement = createInputsLine(DATA_WITH_LINE.update);
  const groupButtons: HTMLDivElement = createGroupButtons();

  const createBtn = lineCreate.querySelector('#create-btn');
  const updateBTN = lineUpdate.querySelector('#update-btn');
  const createName = lineCreate.querySelector('#create-name') as HTMLInputElement;
  const changeName = lineUpdate.querySelector('#update-name') as HTMLInputElement;

  validateForInput(createName);
  validateForInput(changeName);

  updateBTN?.addEventListener('click', async () => {
    const { car } = state;
    if (car) {
      changeDisabledUpdate(true);
      await updateCar(car);
      refreshRace();
    }
  });
  createBtn?.addEventListener('click', async () => {
    await createCustomCar();
    refreshRace();
  });
  element.append(lineCreate);
  element.append(lineUpdate);
  element.append(groupButtons);
  return element;
};

function refreshCount(total:string):void {
  const raceTitle = document.querySelector('.race__title');
  const pageTitle = document.querySelector('.race__page');
  state.countCar = total;
  if (pageTitle) {
    pageTitle.textContent = `Page #${state.page}`;
  }
  if (raceTitle && total) {
    raceTitle.textContent = `Garage(${total})`;
  }
}

async function refreshRace(): Promise<void> {
  const oldRace = document.getElementById('race');
  oldRace?.remove();
  const race = document.querySelector('.race');
  const content = createElement('div', 'race__content', { id: 'race' });

  const cars = await getCars(state.page);
  const { data, total } = cars;
  refreshCount(total);
  const arrTracks = data.map((el) => createTrack(el));

  arrTracks.forEach((track) => {
    content.append(track);
  });
  race?.append(content);
  checkNavButton();
}

function createGroupButtons(): HTMLDivElement {
  const element = document.createElement('div');
  element.className = 'btn-group control-panel__buttons';
  element.setAttribute('role', 'group');
  element.setAttribute('aria-label', 'group buttons');
  const raceBTN = createElement('button', 'btn btn-dark control-panel__button', { id: 'raceBTN' });
  const resetBTN = createElement('button', 'btn btn-dark control-panel__button', { id: 'resetBTN' });
  const generateBTN = createElement('button', 'btn btn-dark control-panel__button', { id: 'generateBTN' });
  raceBTN.textContent = 'race';
  resetBTN.textContent = 'reset';
  generateBTN.textContent = 'generate car';

  raceBTN.addEventListener('click', allStart);
  resetBTN.addEventListener('click', allReset);
  generateBTN.addEventListener('click', async () => {
    await genCars();
    await refreshRace();
  });

  element.append(raceBTN);
  element.append(resetBTN);
  element.append(generateBTN);

  return element;
}

const increasePage = ():void => {
  if (Number(state.countCar) > state.page * LIMIT) {
    state.page += 1;
    refreshRace();
  }
};

const decreasePage = ():void => {
  if (state.page > 1) {
    state.page -= 1;
    refreshRace();
  }
};

function checkNavButton():void {
  const prev = document.querySelector('.prev') as HTMLButtonElement | null;
  const next = document.querySelector('.next') as HTMLButtonElement | null;
  if (prev) {
    if (state.page === 1) {
      prev.disabled = true;
    } else {
      prev.disabled = false;
    }
  }
  if (next) {
    if (Number(state.countCar) - 1 < state.page * LIMIT) {
      next.disabled = true;
    } else {
      next.disabled = false;
    }
  }
}

const createNavForPage = ():HTMLElement => {
  const wrap = createElement('div');
  const prev = createElement('button', 'btn btn-secondary prev') as HTMLButtonElement;
  const next = createElement('button', 'btn btn-secondary next') as HTMLButtonElement;

  prev.addEventListener('click', decreasePage);
  next.addEventListener('click', increasePage);
  prev.textContent = 'prev';
  next.textContent = 'next';

  wrap.append(prev);
  wrap.append(next);
  return wrap;
};

async function renderGarage(): Promise<void> {
  const main = document.getElementById('main') as HTMLElement | null;
  const controlPanel = createControlPanel() as HTMLDivElement;
  const navForPage = createNavForPage();
  const race = createRace();
  if (main) {
    clearElement(main);
    main.append(controlPanel);
    main.append(await race);
    main.append(navForPage);
  }
  checkNavButton();
  addStateDataForInputs();
}

function removeDisabledSelect():void {
  const selects = document.querySelectorAll('.race__select') as NodeListOf<HTMLButtonElement>;
  selects.forEach((select) => {
    if (select.disabled) {
      select.removeAttribute('disabled');
    }
  });
}

function changeDisabledUpdate(mod:boolean):void {
  const updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
  updateBtn.disabled = mod;
}

function addTargetCar(event: Event): void {
  const target = event.target as HTMLButtonElement;
  if (target) {
    const track = target.parentElement?.parentElement;
    const id = track?.dataset.id;
    if (id) state.car = id;
    removeDisabledSelect();
    changeDisabledUpdate(false);
    target.disabled = true;
  }
}

function removeCar(event: Event): void {
  addTargetCar(event);
  deleteCar(state.car);
  refreshRace();
}

async function movedCar(data:IEngine, track:HTMLElement, id:string): Promise<void | IwinRace> {
  const A = track.querySelector('.race__A') as HTMLButtonElement;
  const car = track?.querySelector('.track__car') as SVGElement;
  const name = track?.querySelector('.track__model')?.textContent as string;
  const trackRect = track.getBoundingClientRect();
  const unpassedDistance = 150;
  const STOP_POINT = trackRect.width - unpassedDistance;
  let speed = data.distance / data.velocity;

  const finish = Date.now();
  let requestId: number;
  async function animate() {
    const start = Date.now() - finish;
    car.style.transform = `translateX(${STOP_POINT * (start / speed)}px)`;
    requestId = requestAnimationFrame(animate);

    if (STOP_POINT < STOP_POINT * (start / speed) || speed === Infinity) {
      cancelAnimationFrame(requestId);
      if (speed === Infinity) {
        car.style.transform = 'translateX(0px)';
      }
    }
    if (A.disabled === false) {
      const status = 'stopped';
      const dataOnStop = await startEngine(id, status);
      speed = dataOnStop.distance / dataOnStop.velocity;
    }
  }
  animate();
  const responce = requestDrive(id)
    .then(():IwinRace => ({
      id,
      speed,
      name,
    }))
    .catch(() => cancelAnimationFrame(requestId));
  return responce;
}

async function startedEngine(event:Event):Promise<void> {
  const target = event.target as HTMLButtonElement;
  const track = target.parentElement?.parentElement?.parentElement as HTMLElement;
  const B = track.querySelector('.race__B') as HTMLButtonElement;
  const id = track?.dataset.id as string;
  const status = 'started';
  const data = await startEngine(id, status);
  target.disabled = true;
  B.disabled = false;
  await movedCar(data, track, id);
}

async function allStart(): Promise<void> {
  const tracks = document.querySelectorAll('.track') as NodeListOf<HTMLDivElement>;
  const arr = Array.from(tracks);
  arr.forEach((track) => {
    const a = track.querySelector('.race__A') as HTMLButtonElement;
    a.disabled = true;
  });
  const a = arr.map((el) => el.dataset.id) as string[];
  const status = 'started';
  let isFirst = true;
  const resetBTN = document.getElementById('resetBTN') as HTMLButtonElement;
  resetBTN.disabled = true;
  let count = 0;
  a.forEach(async (id, index) => {
    const data = await startEngine(id, status);
    const res = await movedCar(data, tracks[index], id);
    count += 1;
    if (res && isFirst) {
      isFirst = false;
      alertWinner(res);
      checkWinner(res);
    }
    if (count === a.length) {
      resetBTN.disabled = false;
    }
  });

  arr.forEach((track) => {
    const b = track.querySelector('.race__B') as HTMLButtonElement;
    b.disabled = false;
  });
}

async function stoppedCar(event:Event): Promise<void> {
  const target = event.target as HTMLButtonElement;
  const track = target.parentElement?.parentElement?.parentElement as HTMLElement;
  const A = track.querySelector('.race__A') as HTMLButtonElement;
  const car = track?.querySelector('.track__car') as SVGElement;
  A.disabled = false;
  target.disabled = true;
  car.style.transform = 'translateX(0px)';
}

function allReset():void {
  const buttons = document.querySelectorAll('.race__B') as NodeListOf<HTMLButtonElement>;
  buttons.forEach((btn) => btn.click());
}

export { renderGarage, createTrack };
