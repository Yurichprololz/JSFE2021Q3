import data from "../data";
import createEl from "./template";
interface Icard {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}
interface ICard {
  render: () => void;
  isFited: () => boolean;
  isFitedCopies: () => boolean;
  isFitedYears: () => boolean;
  isFound: () => boolean;
}

class Card implements ICard {
  num: string;
  name: string;
  count: string;
  year: string;
  color: string;
  size: string;
  shape: string;
  favorite: boolean;
  constructor(card: Icard) {
    (this.num = card.num),
      (this.name = card.name),
      (this.count = card.count),
      (this.year = card.year),
      (this.shape = card.shape),
      (this.color = card.color),
      (this.size = card.size),
      (this.favorite = card.favorite);
  }
  render() {
    const conteiner = document.getElementById("toys-conteiner");

    if (conteiner) {
      const div = createEl("div", "card");
      div.innerHTML = `<h6 class="card__name card__title">${this.name}</h6>
            <div class="card__img">
              <img class="" src="./assets/images/toys/${this.num}.png" alt="" />
            </div>
            <p class="card__count card__text">Количество: ${this.count}</p>
            <p class="card__year card__text">Год покупки: ${this.year}</p>
            <p class="card__form card__text">Форма игрушки: ${this.shape}</p>
            <p class="card__color card__text">Цвет игрушки: ${this.color}</p>
            <p class="card__size card__text">Размер игрушки: ${this.size}</p>
            <p class="card__favorite card__text">Любимая: ${this.favorite ? "да" : "нет"}</p>
      `;
      conteiner.append(div);
    }
  }
  isFited() {
    if (this.isFitedCopies() && this.isFitedYears() && this.isFound()) {
      return true;
    }
    return false;
  }
  isFitedCopies() {
    const inputs = document.querySelectorAll(".nouiinput__copies_input") as unknown as HTMLInputElement[];
    if (Number(this.count) < Number(inputs[0].value) || Number(this.count) > Number(inputs[1].value)) {
      return false;
    }
    return true;
  }
  isFitedYears() {
    const inputs = document.querySelectorAll(".nouiinput__years_input") as unknown as HTMLInputElement[];
    console.log(this.year, inputs[0].value, inputs[1].value);

    if (Number(this.year) < Number(inputs[0].value) || Number(this.year) > Number(inputs[1].value)) {
      return false;
    }
    return true;
  }
  isFound() {
    const input = document.getElementById("search") as HTMLInputElement;
    const regexp = new RegExp(input.value, "i");

    if (!input.value || regexp.test(this.name)) {
      return true;
    }
    return false;
  }
}
const noResult = () => {
  const conteiner = document.getElementById("toys-conteiner");
  if (conteiner) {
    conteiner.innerHTML = `
    <div class="card__no-resault">
            <p class="card__title">Извините, совпадений не обнаружено</p>
          </div>`;
  }
};

const updateCards = () => {
  const conteiner = document.getElementById("toys-conteiner");
  let isEmpty = true;
  if (conteiner) {
    conteiner.innerHTML = ``;
  }
  data.forEach((el) => {
    const card = new Card(el);
    if (card.isFited()) {
      isEmpty = false;
      card.render();
    }
  });
  if (isEmpty) {
    noResult();
  }
};

export { updateCards };
