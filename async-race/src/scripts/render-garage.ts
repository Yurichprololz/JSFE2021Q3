import { createElement, clearElement } from './utils';
import { getCars } from './api';
import { ICar } from './interfaces';
// import carSvg from '../assets/img/car.svg';

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
          />
          <input type="color" class="control-panel__color" value="${data.color}" name="" id="" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary control-panel__button" type="button">${data.textButton}</button>
          </div>
          `;
  return element;
};

const createGroupButtons = (): HTMLDivElement => {
  const element = document.createElement('div');
  element.className = 'btn-group control-panel__buttons';
  element.setAttribute('role', 'group');
  element.setAttribute('aria-label', 'group buttons');
  element.innerHTML = `
        <button type="button" class="btn btn-dark control-panel__button">race</button>
        <button type="button" class="btn btn-dark control-panel__button">reset</button>
        <button type="button" class="btn btn-dark control-panel__button">generate car</button>`;

  return element;
};

const createSVG = (color:string) => `
<svg width="60px" height="60px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="${color}" 
d="M188.287 169.428c-28.644-.076-60.908 2.228-98.457 8.01-4.432.62-47.132 24.977-58.644 41.788-11.512 16.812-15.45 48.813-15.45 
48.813-3.108 13.105-1.22 34.766-.353 36.872 1.17 4.56 7.78 8.387 19.133 11.154C35.84 295.008 53.29 278.6 74.39 278.574c22.092 0 40 
17.91 40 40-.014 1.764-.145 3.525-.392 5.272.59.008 1.26.024 1.82.03l239.266 1.99c-.453-2.405-.685-4.845-.693-7.292 0-22.09 17.91-40 
40-40 22.092 0 40 17.91 40 40 0 2.668-.266 5.33-.796 7.944l62.186.517c1.318-22.812 6.86-46.77-7.024-66.72-5.456-7.84-31.93-22.038-99.03-32.66-34.668-17.41-68.503-37.15-105.35-48.462-28.41-5.635-59.26-9.668-96.09-9.765zm-17.197 11.984c5.998.044 
11.5.29 16.014.81l7.287 48.352c-41.43-5.093-83.647-9.663-105.964-27.5.35-5.5 7.96-13.462 16.506-16.506 4.84-1.724 40.167-5.346 66.158-5.156zm34.625.348c25.012.264 62.032 2.69 87.502 13.94 12.202 5.65 35.174 18.874 50.537 30.55l-6.35 10.535c-41.706-1.88-97.288-4.203-120.1-6.78l-11.59-48.245zM74.39 
294.574a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24zm320 0a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24z"/></svg>`;

const createTrack = (car:ICar) => {
  const { name, color } = car;
  const track = createElement('div', 'track');
  const model = createElement('span', 'track__model');
  const imgCar = createElement('object');
  imgCar.innerHTML = createSVG(color);// new Svg(carSvg);

  model.textContent = name;

  track.append(imgCar);
  track.append(model);

  return track;
};

const createRace = async (): Promise<HTMLElement> => {
  const race = createElement('div', 'race');
  const title = createElement('h2', 'race__title');
  const page = createElement('h3', 'race__page');
  const content = createElement('div', 'race__content', { id: 'race' });

  title.textContent = 'Garage';
  page.textContent = 'Page #';

  race.append(title);
  race.append(page);
  race.append(content);

  const data = await getCars();
  const arrTracks = data.map((el) => createTrack(el));

  arrTracks.forEach((track) => {
    race.append(track);
  });

  return race;
};
const createControlPanel = (): HTMLDivElement => {
  const element = document.createElement('div');
  element.classList.add('control-panel');
  const lineCreate: HTMLDivElement = createInputsLine(DATA_WITH_LINE.create);
  const lineUpdate: HTMLDivElement = createInputsLine(DATA_WITH_LINE.update);
  const groupButtons: HTMLDivElement = createGroupButtons();

  element.append(lineCreate);
  element.append(lineUpdate);
  element.append(groupButtons);
  return element;
};

async function renderGarage(): Promise<void> {
  const main = document.getElementById('main') as HTMLElement | null;
  const controlPanel = createControlPanel() as HTMLDivElement;
  const race = createRace();
  if (main) {
    clearElement(main);
    main?.append(controlPanel);
    main?.append(await race);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { renderGarage };
