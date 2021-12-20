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
  isFitedColor: () => boolean;
  isFitedForm: () => boolean;
  isFitedSize: () => boolean;
  toogleFavorite: () => void;
  getFavoriteCount: () => number;
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
  static collection = data.map((el) => new Card(el));
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
      if (this.favorite) {
        div.classList.add("card_favorite");
      }
      div.addEventListener("click", () => {
        this.toogleFavorite();
      });
      conteiner.append(div);
    }
  }
  showCountFavorite() {
    const counter = document.getElementById("toys-count") as Element;
    if (counter) {
      counter.textContent = String(this.getFavoriteCount());
    }
  }
  getFavoriteCount() {
    return Card.collection.filter((el) => el.favorite).length;
  }

  toogleFavorite() {
    const favorite = document.getElementById("favorite") as HTMLInputElement;
    this.favorite = !this.favorite;
    if (this.getFavoriteCount() <= 20) {
      favorite.checked ? showFavorite() : renderCards();
    } else {
      this.favorite = !this.favorite;
      alert("Извините, все слоты заполнены");
    }
    this.showCountFavorite();
  }
  isFited() {
    if (
      this.isFitedCopies() &&
      this.isFitedYears() &&
      this.isFound() &&
      this.isFitedColor() &&
      this.isFitedForm() &&
      this.isFitedSize()
    ) {
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
    if (Number(this.year) < Number(inputs[0].value) || Number(this.year) > Number(inputs[1].value)) {
      return false;
    }
    return true;
  }
  isFitedColor() {
    const filters = document.querySelectorAll(".filter__color-btn") as unknown as HTMLElement[];
    const colors: string[] = [];
    filters.forEach((el) => {
      if (el.classList.contains("active")) {
        if (el.dataset.color) {
          colors.push(el.dataset.color);
        }
      }
    });
    if (!colors[0]) {
      return true;
    }
    if (colors.includes(this.color)) {
      return true;
    }
    return false;
  }
  isFound() {
    const input = document.getElementById("search") as HTMLInputElement;
    const regexp = new RegExp(input.value, "i");

    if (!input.value || regexp.test(this.name)) {
      return true;
    }
    return false;
  }
  isFitedForm() {
    const filters = document.querySelectorAll(".filter__form-card") as unknown as HTMLElement[];
    const forms: string[] = [];
    filters.forEach((el) => {
      if (el.classList.contains("active_form")) {
        if (el.dataset.form) {
          forms.push(el.dataset.form);
        }
      }
    });
    if (!forms[0]) {
      return true;
    }
    if (forms.includes(this.shape)) {
      return true;
    }
    return false;
  }
  isFitedSize() {
    const filters = document.querySelectorAll(".filter__checkbox") as unknown as HTMLInputElement[];
    const sizes: string[] = [];
    filters.forEach((el) => {
      if (el.checked) {
        if (el.dataset.size) {
          sizes.push(el.dataset.size);
        }
      }
    });
    if (!sizes[0]) {
      return true;
    }
    if (sizes.includes(this.size)) {
      return true;
    }
    return false;
  }
}

const sortByNameOfDecrease = (): void => {
  Card.collection.sort((a, b) => (a.name < b.name ? 1 : -1));
};

const sortByNameOfIncrease = (): void => {
  Card.collection.sort((a, b) => (a.name > b.name ? 1 : -1));
};

const sortByCopuesOfDecrease = (): void => {
  Card.collection.sort((a, b) => (Number(a.count) < Number(b.count) ? 1 : -1));
};

const sortByCopuesOfIncrease = (): void => {
  Card.collection.sort((a, b) => (Number(a.count) > Number(b.count) ? 1 : -1));
};

const sort = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  switch (target.value) {
    case "name-of-increase":
      sortByNameOfIncrease();
      break;
    case "name-of-decrease":
      sortByNameOfDecrease();
      break;
    case "amount-of-increase":
      sortByCopuesOfIncrease();
      break;
    case "amount-of-decrease":
      sortByCopuesOfDecrease();
      break;
  }
  updateCards();
};

const noResult = () => {
  const conteiner = document.getElementById("toys-conteiner");
  if (conteiner) {
    conteiner.innerHTML = `
    <div class="card__no-resault">
            <p class="card__title">Извините, совпадений не обнаружено</p>
          </div>`;
  }
};

const renderCards = () => {
  const conteiner = document.getElementById("toys-conteiner");
  let isEmpty = true;
  if (conteiner) {
    conteiner.innerHTML = ``;
  }
  Card.collection.forEach((el) => {
    if (el.isFited()) {
      isEmpty = false;
      el.render();
    }
  });
  if (isEmpty) {
    noResult();
  }
};

const updateCardsWithoutAnimation = () => {
  const favorite = document.getElementById("favorite") as HTMLInputElement;
  if (favorite.checked) {
    favorite.removeAttribute("checked");
    favorite.click();
  }
  renderCards();
  Card.collection[0].showCountFavorite();
};

const updateCards = () => {
  const anim = new Promise<void>((res) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.add("card_scale");
    });
    setTimeout(() => res(), 300);
  });
  anim
    .then(() => {
      updateCardsWithoutAnimation();
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.classList.add("card_scale");
      });
    })
    .then(() => {
      setTimeout(() => {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
          if (card.classList.contains("card_scale")) {
            card.classList.remove("card_scale");
          }
        });
      }, 100);
    });
};

const showFavoritewithoutAnimation = () => {
  const conteiner = document.getElementById("toys-conteiner");
  let isEmpty = true;
  if (conteiner) {
    conteiner.innerHTML = ``;
  }
  Card.collection.forEach((el) => {
    if (el.favorite) {
      isEmpty = false;
      el.render();
    }
  });
  if (isEmpty) {
    noResult();
  }
};
const showFavorite = () => {
  const anim = new Promise<void>((res) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.add("card_scale");
    });
    setTimeout(() => res(), 300);
  });
  anim
    .then(() => {
      showFavoritewithoutAnimation();
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.classList.add("card_scale");
      });
    })
    .then(() => {
      setTimeout(() => {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
          if (card.classList.contains("card_scale")) {
            card.classList.remove("card_scale");
          }
        });
      }, 100);
    });
};

const saveFavorite = () => {
  const arr: boolean[] = Card.collection.map((card) => {
    if (card.favorite) {
      return true;
    } else {
      return false;
    }
  });
  return arr;
};

const setFavorite = () => {
  const favorite: string | null = localStorage.getItem("favorite");
  if (!favorite) return;
  const arrFavorite: boolean[] = JSON.parse(favorite);
  arrFavorite.forEach((value, index) => {
    if (value != Card.collection[index].favorite) {
      Card.collection[index].favorite = !Card.collection[index].favorite;
    }
  });
};

export { updateCards, sort, showFavorite, sortByNameOfIncrease, saveFavorite, setFavorite, renderCards };
