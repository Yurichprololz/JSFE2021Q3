import { IwinRace } from './interfaces';
import { createElement, msConvertToSec } from './utils';

export default function alertWinner(winner: IwinRace) {
  const { name, speed } = winner;
  const popUp = createElement('span', 'popup');
  popUp.textContent = `${name} is first with ${msConvertToSec(speed)} seconds`;
  const main = document.querySelector('main');
  if (main) {
    main.append(popUp);
    setTimeout(() => popUp.remove(), 3000);
  }
}
