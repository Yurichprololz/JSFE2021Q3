import { createElement, clearElement, createImage } from './utils';
import {
  getCars, genCars, /* , getCar */
  createCustomCar, deleteCar, updateCar, startEngine, requestDrive,
} from './api';
import {
  ICar, /* , Istate */
  IEngine,
} from './interfaces';
// import flag from './assets/img/flag-of-the-finish.png';
// import carSvg from '../assets/img/car.svg';
import state from './state';
// import { decreasePage, increasePage } from './cars';

// let { page } = state;

type Tdata = {
  class: String;
  color: String;
  textButton: String;
};

const DATA_WITH_LINE = {
  create: {
    class: 'control-panel__create',
    color: '#e66465',
    textButton: 'create',
  },
  update: {
    class: 'control-panel__update',
    color: '#f6b73c',
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
          <input type="color" class="control-panel__color" id="${data.textButton}-clr" value="${data.color}" name="" />
            <button class="btn btn-outline-secondary control-panel__button" id="${data.textButton}-btn" ${data.textButton === 'update' ? 'disabled' : ''}  type="button">${data.textButton}</button>
          `;
  return element;
};

const createSVG = (color:string) => `
<svg class="track__car" width="60px" height="60px" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path fill="${color}" 
d="M188.287 169.428c-28.644-.076-60.908 2.228-98.457 8.01-4.432.62-47.132 24.977-58.644 41.788-11.512 16.812-15.45 48.813-15.45 
48.813-3.108 13.105-1.22 34.766-.353 36.872 1.17 4.56 7.78 8.387 19.133 11.154C35.84 295.008 53.29 278.6 74.39 278.574c22.092 0 40 
17.91 40 40-.014 1.764-.145 3.525-.392 5.272.59.008 1.26.024 1.82.03l239.266 1.99c-.453-2.405-.685-4.845-.693-7.292 0-22.09 17.91-40 
40-40 22.092 0 40 17.91 40 40 0 2.668-.266 5.33-.796 7.944l62.186.517c1.318-22.812 6.86-46.77-7.024-66.72-5.456-7.84-31.93-22.038-99.03-32.66-34.668-17.41-68.503-37.15-105.35-48.462-28.41-5.635-59.26-9.668-96.09-9.765zm-17.197 11.984c5.998.044 
11.5.29 16.014.81l7.287 48.352c-41.43-5.093-83.647-9.663-105.964-27.5.35-5.5 7.96-13.462 16.506-16.506 4.84-1.724 40.167-5.346 66.158-5.156zm34.625.348c25.012.264 62.032 2.69 87.502 13.94 12.202 5.65 35.174 18.874 50.537 30.55l-6.35 10.535c-41.706-1.88-97.288-4.203-120.1-6.78l-11.59-48.245zM74.39 
294.574a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24zm320 0a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24z"/></svg>`;

const createRaceButtons = (model:HTMLElement) => {
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

const createTrack = (car:ICar) => {
  const { name, color, id } = car;
  const track = createElement('div', 'track');
  track.dataset.id = `${id}`;
  const model = createElement('span', 'track__model');
  model.textContent = name;
  const imgCar = createElement('object');
  const buttons = createRaceButtons(model);
  imgCar.innerHTML = createSVG(color);

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
const createControlPanel = (): HTMLDivElement => {
  const element = document.createElement('div');
  element.classList.add('control-panel');
  const lineCreate: HTMLDivElement = createInputsLine(DATA_WITH_LINE.create);
  const lineUpdate: HTMLDivElement = createInputsLine(DATA_WITH_LINE.update);
  const groupButtons: HTMLDivElement = createGroupButtons();

  const createBtn = lineCreate.querySelector('#create-btn');
  const updateBTN = lineUpdate.querySelector('#update-btn');

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

function refreshCount(total:string) {
  const raceTitle = document.querySelector('.race__title');
  const pageTitle = document.querySelector('.race__page');
  if (pageTitle) {
    pageTitle.textContent = `Page #${state.page}`;
  }
  if (raceTitle && total) {
    raceTitle.textContent = `Garage(${total})`;
  }
}

async function refreshRace() {
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
  // element.innerHTML = `
  //       <button type="button" class="btn btn-dark control-panel__button">race</button>
  //       <button type="button" class="btn btn-dark control-panel__button">reset</button>
  //       <button type="button" class="btn btn-dark control-panel__button">generate car</button>`;
  generateBTN.addEventListener('click', async () => {
    await genCars();
    await refreshRace();
  });

  element.append(raceBTN);
  element.append(resetBTN);
  element.append(generateBTN);

  return element;
}

function increasePage():void {
  state.page += 1;
  refreshRace();
}
const decreasePage = ():void => {
  if (state.page > 1) {
    state.page -= 1;
  }
  refreshRace();
};

const createNavForPage = ():HTMLElement => {
  const wrap = createElement('div');
  const prev = createElement('button', 'btn');
  const next = createElement('button', 'btn');

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
}

function removeDisabledSelect() {
  const selects = document.querySelectorAll('.race__select') as NodeListOf<HTMLButtonElement>;
  selects.forEach((select) => {
    if (select.disabled) {
      select.removeAttribute('disabled');
    }
  });
}

function changeDisabledUpdate(mod:boolean) {
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

async function movedCar(data:IEngine, track:HTMLElement, id:string):Promise<void> {
  const A = track.querySelector('.race__A') as HTMLButtonElement;
  const car = track?.querySelector('.track__car') as SVGElement;
  const trackRect = track.getBoundingClientRect();
  const unpassedDistance = 150;
  const STOP_POINT = trackRect.width - unpassedDistance;

  const { velocity, distance } = data;
  const speed = distance / velocity;

  const finish = Date.now();
  let requestId: number;
  function animate(): void {
    const start = Date.now() - finish;
    car.style.transform = `translateX(${STOP_POINT * (start / speed)}px)`;

    requestId = requestAnimationFrame(animate);
    if (STOP_POINT < STOP_POINT * (start / speed) || A.disabled === false) {
      cancelAnimationFrame(requestId);
    }
  }
  animate();
  await requestDrive(id)
    .catch(() => cancelAnimationFrame(requestId));
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
  movedCar(data, track, id);
  // await requestDrive(id)
  // .catch(() => cancelAnimationFrame())
}
async function stoppedCar(event:Event) {
  const target = event.target as HTMLButtonElement;
  const track = target.parentElement?.parentElement?.parentElement as HTMLElement;
  const A = track.querySelector('.race__A') as HTMLButtonElement;
  const car = track?.querySelector('.track__car') as SVGElement;
  const id = track?.dataset.id as string;
  const status = 'stopped';
  A.disabled = false;
  await startEngine(id, status);
  target.disabled = true;
  car.style.transform = 'translateX(0px)';
}

export { renderGarage, createTrack };
