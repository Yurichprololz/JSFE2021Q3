import { clearElement, createElement } from './utils';
import state from './state';
import { getWinners, getCar, WINNERS_LIMIT } from './api';
import { ICar, IWinner, IWinners } from './interfaces';
import createCar from './get-SVG-car';

const refreshCount = () => {
  const countPage = document.querySelector('.winners__page');
  if (countPage) {
    countPage.textContent = `Page#${state.pageWithWinnerPage}`;
  }
};

const refreshBoard = async ():Promise<void> => {
  const table = document.querySelector('table') as HTMLElement;
  const tbody = document.querySelector('tbody') as HTMLElement | null;
  refreshCount();

  if (tbody) {
    tbody.remove();
  }
  const newTbody = await createTablesBody();
  table.append(newTbody);
};

const increasePage = ():void => {
  if (Number(state.countWinners) > state.pageWithWinnerPage * WINNERS_LIMIT) {
    state.pageWithWinnerPage += 1;
    refreshBoard();
  }
};

const decreasePage = ():void => {
  if (state.pageWithWinnerPage > 1) {
    state.pageWithWinnerPage -= 1;
    refreshBoard();
  }
};

const createNavForPage = ():HTMLElement => {
  const nav = createElement('div');
  const prev = createElement('button', 'btn');
  const next = createElement('button', 'btn');

  prev.addEventListener('click', decreasePage);
  next.addEventListener('click', increasePage);
  prev.textContent = 'prev';
  next.textContent = 'next';

  nav.append(prev);
  nav.append(next);
  return nav;
};

const cleanStylesSortButton = (el:HTMLElement):void => {
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

const checkOrder = async (event:Event):Promise<void> => {
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

const getOrderNumber = (i:number):string => {
  const numb = String((state.pageWithWinnerPage - 1) * WINNERS_LIMIT + i + 1);
  return numb;
};

async function createTablesBody():Promise<HTMLElement> {
  const tbody = createElement('tbody');
  const dataWinners: IWinners = await getWinners(
    state.pageWithWinnerPage,
    state.sortBy,
    state.orderBy,
  );

  state.countWinners = dataWinners.total;
  const winners:IWinner[] = dataWinners.data;
  winners.forEach(async (winner, index) => {
    const car: ICar = await getCar(winner.id);
    const tr = createElement('tr');
    const th = createElement('th', '', { scope: 'row' });
    th.textContent = getOrderNumber(index);
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

  const table = await createTable();

  title.textContent = `Winners(${state.countWinners})`;
  page.textContent = `Page#${state.pageWithWinnerPage}`;
  const nav = createNavForPage();

  element.append(title);
  element.append(page);
  element.append(table);
  element.append(nav);
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
