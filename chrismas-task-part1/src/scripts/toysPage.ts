import { listenerForColorFilters } from "./color-filter";
import { listenerForFormFilters } from "./form-filter";
import { listenerForSizeFilters } from "./size-filter";
import initNoUiSlider from "./nouislider";
import initSearch from "./search";
import { updateCards, showFavorite } from "./card";
import { initSort } from "./sort";

const renderToysPage = () => {
  const header = document.getElementById("header") as HTMLElement;
  header.classList.add("non-main-content");
  const main = document.getElementById("main") as HTMLElement;
  main.classList.add("main_toys");
  main.innerHTML = `
    <div class="toys-page">
        <div class="filter">
          <div class="filter__sort">
            <h5 class="filter__title">Сортировать</h5>
            <select class="filter__sort-by button" id="sort">
              <option class="filter__sort-option" value="name-of-increase">алфавиту "А-Я"</option>
              <option class="filter__sort-option" value="name-of-decrease">алфавиту "Я-А"</option>
              <option class="filter__sort-option" value="amount-of-increase">возрастанию количества игрушек</option>
              <option class="filter__sort-option" value="amount-of-decrease">убыванию количества игрушек</option>
            </select>
          </div>
          <div class="filter__category">
            <h5 class="filter__title">Categoties</h5>
            <input class="filter__category-input" type="checkbox" name="" id="category" checked />
            <label class="filter__category-label" for="category">All</label>
          </div>
          <h5 class="filter__subtitle">form</h5>
          <div class="filter__form">
            <div class="filter__form-card" data-form="шишка">
              <img class="filter__form-card-img" src="./assets/images/svg/forms/pine.svg" alt="" />
              <span class="filter__form-card-text">шишка</span>
            </div>
            <div class="filter__form-card" data-form="снежинка">
              <img class="filter__form-card-img" src="./assets/images/svg/forms/snowflake.svg" alt="" />
              <span class="filter__form-card-text">снежинка</span>
            </div>
            <div class="filter__form-card" data-form="фигурка">
              <img class="filter__form-card-img" src="./assets/images/svg/forms/bird_toy.svg" alt="" />
              <span class="filter__form-card-text">фигурка</span>
            </div>
            <div class="filter__form-card" data-form="шар">
              <img class="filter__form-card-img" src="./assets/images/svg/forms/ball.svg" alt="" />
              <span class="filter__form-card-text">шар</span>
            </div>
            <div class="filter__form-card" data-form="колокольчик">
              <img class="filter__form-card-img" src="./assets/images/svg/forms/bell.svg" alt="" />
              <span class="filter__form-card-text">колокольчик</span>
            </div>
          </div>
          <div class="filter__range">
            <h5 class="filter__subtitle">Number of copies</h5>
            <div class="filter__range-input nouiinput" id="range-copy"></div>
            <div class="nouiinput__conteiner-number">
              <input type="number" class="nouiinput__number nouiinput__copies_input" name="" id="" placeholder="1" />
              <input
                type="number"
                class="nouiinput__number nouiinput__number_right nouiinput__copies_input"
                name=""
                id=""
                placeholder="12"
              />
            </div>
            <div class="filter__range">
              <h5 class="filter__subtitle">Year of purchase</h5>
              <div class="filter__range-input nouiinput" id="range-years"></div>
              <div class="nouiinput__conteiner-number">
                <input
                  type="number"
                  class="nouiinput__number nouiinput__years_input"
                  name=""
                  id=""
                  placeholder="1940"
                />
                <input
                  type="number"
                  class="nouiinput__number nouiinput__number_right nouiinput__years_input"
                  name=""
                  id=""
                  placeholder="2021"
                />
              </div>
            </div>
          </div>

          <h5 class="filter__subtitle">Color</h5>
          <div class="filter__color">
            <button data-color="белый" class="filter__color-btn filter__color-btn_1"></button>
            <button data-color="желтый" class="filter__color-btn filter__color-btn_2"></button>
            <button data-color="красный" class="filter__color-btn filter__color-btn_3"></button>
            <button data-color="синий" class="filter__color-btn filter__color-btn_4"></button>
            <button data-color="зелёный" class="filter__color-btn filter__color-btn_5"></button>
          </div>
          <h5 class="filter__subtitle">Size</h5>
          <div class="filter__size">
            <input class="filter__checkbox" data-size="большой" type="checkbox" name="" id="big-size" />
            <label class="filter__size-label" for="big-size">big</label>
            <input class="filter__checkbox" data-size="средний" type="checkbox" name="" id="avarage-size" />
            <label class="filter__size-label" for="avarage-size">avarage</label>
            <input class="filter__checkbox" data-size="малый" type="checkbox" name="" id="small-size" />
            <label class="filter__size-label" for="small-size">small</label>
          </div>
          <input class="filter__checkbox" type="checkbox" name="" id="favorite" />
          <label class="filter__size-label" for="favorite">favorite</label>
          <div class="filter__reset">
            <button class="button button_main filter__button">reset filters</button>
            <button class="button button_main filter__button">reset setting</button>
          </div>
        </div>
        <div class="toys-conteiner" id="toys-conteiner">
        </div>
      </div>
    `;
  afterRenderToysPage();
};

const afterRenderToysPage = () => {
  listenerForColorFilters();
  listenerForFormFilters();
  listenerForSizeFilters();
  showFavorite();
  initNoUiSlider();
  updateCards();
  initSearch();
  initSort();

  const event = new Event("change");
  const sort = document.getElementById("sort") as HTMLSelectElement;
  sort.dispatchEvent(event);
  const search = document.getElementById("search") as HTMLInputElement;
  search.focus();
};

export { renderToysPage };
