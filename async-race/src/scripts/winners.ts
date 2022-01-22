import { clearElement, createElement } from './utils';
import state from './state';
import { getWinners, getCar } from './api';
import { ICar, IWinner } from './interfaces';
import createCar from './get-SVG-car';

const refreshBoard = async () => {
  const table = document.querySelector('table') as HTMLElement;
  const tbody = document.querySelector('tbody') as HTMLElement;
  tbody.remove();
  const newTbody = await createTablesBody();
  table.append(newTbody);
};

const cleanStylesSortButton = (el:HTMLElement) => {
  const sortBTN = document.querySelectorAll('.sort') as NodeListOf<HTMLElement>;
  sortBTN.forEach((btn) => {
    if (btn !== el) {
      if (btn.classList.contains('DESC')) {
        btn.classList.remove('DESC');
      }
      if (btn.classList.contains('ASC')) {
        btn.classList.remove('ASC');
      }
    }
  });
};

const checkOrder = async (event:Event) => {
  const el = event.target as HTMLElement;
  cleanStylesSortButton(el);
  if (!el.classList.contains('DESC') && !el.classList.contains('ASC')) {
    el.classList.add('ASC');
    state.orderBy = 'ASC';
  }
  if (el.classList.contains('DESC')) {
    state.orderBy = 'ASC';
    el.classList.remove('DESC');
    el.classList.add('ASC');
  } else {
    state.orderBy = 'DESC';
    el.classList.add('DESC');
    el.classList.remove('ASC');
  }
  await refreshBoard();
};

const sortByWins = (event:Event):void => {
  state.sortBy = 'wins';
  checkOrder(event);
};
const sortByTime = (event:Event):void => {
  state.sortBy = 'time';
  checkOrder(event);
};

const createTablesHead = ():HTMLElement => {
  const nameOfCol:string[] = ['№', 'Car', 'Name', 'Wins', 'Best time'];
  const events:EventListenerOrEventListenerObject[] = [() => {}, () => {},
    () => {}, sortByWins, sortByTime];

  const head = createElement('thead');
  const tr = createElement('tr');
  nameOfCol.forEach((name, index) => {
    const el = createElement('th', '', { scope: 'col' });
    if (index > 2) {
      el.classList.add('sort');
      el.addEventListener('click', events[index]);
    }
    el.textContent = name;
    tr.append(el);
  });
  head.append(tr);

  return head;
};

async function createTablesBody() {
  const tbody = createElement('tbody');
  const winners: IWinner[] = await getWinners(
    state.pageWithWinnerPage,
    state.sortBy,
    state.orderBy,
  );
  winners.forEach(async (winner, index) => {
    const car: ICar = await getCar(winner.id);
    const tr = createElement('tr');
    const th = createElement('th', '', { scope: 'row' });
    th.textContent = String(index + 1);
    const image = createElement('td');
    const imageCar = createCar(car.color, 'winners__car');
    const name = createElement('td');
    name.textContent = car.name;
    const wins = createElement('td');
    wins.textContent = String(winner.wins);
    const time = createElement('td');
    time.textContent = String(winner.time);

    image.append(imageCar);
    tr.append(th);
    tr.append(image);
    tr.append(name);
    tr.append(wins);
    tr.append(time);
    tbody.append(tr);
  });
  return tbody;
}

const createTable = async ():Promise<HTMLTableElement> => {
  const table = createElement('table', 'table table-dark table-striped') as HTMLTableElement;
  const thead = createTablesHead();
  const tbody = createTablesBody();
  table.append(thead);
  table.append(await tbody);
  return table;
};

const createWinners = async (): Promise<HTMLElement> => {
  const element = createElement('div', 'winners');
  const title = createElement('h2', 'winners__title');
  const page = createElement('h3', 'winners__page');

  title.textContent = 'Winners';
  page.textContent = 'Page#';

  const table = createTable();

  element.append(title);
  element.append(page);
  element.append(await table);
  return element;
};

export default async function renderWinners(): Promise<void> {
  const main = document.getElementById('main') as HTMLElement | null;
  const winners = createWinners();
  if (main) {
    clearElement(main);
    main.append(await winners);
  }
}
export { renderWinners };
