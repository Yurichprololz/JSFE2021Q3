// import "./scss/vendors/bootstrap/bootstrap.scss";
import './scss/main.scss';
import renderBasicLayout from './scripts/basic-layout';
import { renderGarage, allStart } from './scripts/render-garage';
// import { renderWinners } from "./scripts/winners";
// import { genCars } from './scripts/api';

renderBasicLayout();
renderGarage();

setTimeout(() => allStart(), 2000);
