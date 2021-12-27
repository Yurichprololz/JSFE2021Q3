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
interface ICard extends Icard {
  chosen: boolean;
  render: () => void;
  showCountFavorite: () => void;
  getFavoriteCount: () => number;
  toogleFavorite: () => void;
  isFited: () => boolean;
  isFitedCopies: () => boolean;
  isFitedYears: () => boolean;
  isFitedColor: () => boolean;
  isFound: () => boolean;
  isFitedForm: () => boolean;
  isFitedSize: () => boolean;
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
  chosen: boolean;

  static collection: Card[] = data.map((el) => new Card(el));

  constructor(card: Icard) {
    (this.num = card.num),
      (this.name = card.name),
      (this.count = card.count),
      (this.year = card.year),
      (this.shape = card.shape),
      (this.color = card.color),
      (this.size = card.size),
      (this.favorite = card.favorite);
    this.chosen = false;
  }

  render(): void {
    const conteiner = document.getElementById("toys-conteiner") as HTMLDivElement;

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
      if (this.chosen) {
        div.classList.add("card_favorite");
      }
      div.addEventListener("click", () => {
        this.toogleFavorite();
      });
      conteiner.append(div);
    }
  }

  showCountFavorite(): void {
    const counter = document.getElementById("toys-count") as Element;
    if (counter) {
      counter.textContent = String(this.getFavoriteCount());
    }
  }

  getFavoriteCount(): number {
    return Card.collection.filter((el) => el.chosen).length;
  }

  toogleFavorite(): void {
    const favorite = document.getElementById("favorite") as HTMLInputElement;
    this.chosen = !this.chosen;
    if (this.getFavoriteCount() <= 20) {
      favorite.checked ? showFavorite() : renderCards();
    } else {
      this.chosen = !this.chosen;
      alert("Извините, все слоты заполнены");
    }
    this.showCountFavorite();
  }

  isFited(): boolean {
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

  isFitedCopies(): boolean {
    const inputs = document.querySelectorAll(".nouiinput__copies_input") as unknown as HTMLInputElement[];
    if (Number(this.count) < Number(inputs[0].value) || Number(this.count) > Number(inputs[1].value)) {
      return false;
    }
    return true;
  }

  isFitedYears(): boolean {
    const inputs = document.querySelectorAll(".nouiinput__years_input") as unknown as HTMLInputElement[];
    if (Number(this.year) < Number(inputs[0].value) || Number(this.year) > Number(inputs[1].value)) {
      return false;
    }
    return true;
  }

  isFitedColor(): boolean {
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

  isFound(): boolean {
    const input = document.getElementById("search") as HTMLInputElement;
    const regexp = new RegExp(input.value, "i");

    if (!input.value || regexp.test(this.name)) {
      return true;
    }
    return false;
  }

  isFitedForm(): boolean {
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

  isFitedSize(): boolean {
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

const sort = (e: Event): void => {
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

const noResult = (): void => {
  const conteiner = document.getElementById("toys-conteiner");
  if (conteiner) {
    conteiner.innerHTML = `
    <div class="card__no-resault">
            <p class="card__title">Извините, совпадений не обнаружено</p>
          </div>`;
  }
};

const renderCards = (): void => {
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

const updateCardsWithoutAnimation = (): void => {
  const favorite = document.getElementById("favorite") as HTMLInputElement;
  if (favorite.checked) {
    favorite.removeAttribute("checked");
    favorite.click();
  }
  renderCards();
  Card.collection[0].showCountFavorite();
};

const updateCards = (): void => {
  const anim = new Promise<void>((res) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.add("card_scale");
    });
    setTimeout((): void => res(), 300);
  });
  anim
    .then((): void => {
      updateCardsWithoutAnimation();
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.classList.add("card_scale");
      });
    })
    .then((): void => {
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

const showFavoritewithoutAnimation = (): void => {
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

const showFavorite = (): void => {
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

const saveFavorite = (): boolean[] => {
  const arr: boolean[] = Card.collection.map((card) => {
    if (card.chosen) {
      return true;
    } else {
      return false;
    }
  });
  return arr;
};

const setFavorite = (): void => {
  const favorite: string | null = localStorage.getItem("favorite");
  if (!favorite) return;
  const arrFavorite: boolean[] = JSON.parse(favorite);
  arrFavorite.forEach((value, index) => {
    if (value != Card.collection[index].chosen) {
      Card.collection[index].chosen = !Card.collection[index].chosen;
    }
  });
};

const getFavorite = (): Card[] => {
  const collection = Card.collection.filter((el) => el.chosen);
  if (collection.length !== 0) {
    return collection;
  }
  return Card.collection.slice(0, 20);
};
export { updateCards, sort, showFavorite, sortByNameOfIncrease, saveFavorite, setFavorite, renderCards, getFavorite };
export { ICard };
