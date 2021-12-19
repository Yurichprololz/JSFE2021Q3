import { listenerForColorFilters } from "./color-filter";
import { listenerForFormFilters } from "./form-filter";
import { listenerForSizeFilters } from "./size-filter";
import initNoUiSlider from "./nouislider";
import initSearch from "./search";
import { updateCards, showFavorite } from "./card";
import { initSort } from "./sort";
import { resetFilters } from "./reset-filters";

const renderToysPage = () => {
  const header = document.getElementById("header") as HTMLElement;
  header.classList.add("non-main-content");
  const main = document.getElementById("main") as HTMLElement;
  main.classList.add("main_toys");
  main.innerHTML = `
    <div class="toys-page">
        <div class="filter">
          <div class="filter__sort">
            <h5 class="filter__title">Сортировать по</h5>
            <select class="filter__sort-by button" id="sort">
              <option class="filter__sort-option" value="name-of-increase">алфавиту "А-Я"</option>
              <option class="filter__sort-option" value="name-of-decrease">алфавиту "Я-А"</option>
              <option class="filter__sort-option" value="amount-of-increase">возрастанию количества игрушек</option>
              <option class="filter__sort-option" value="amount-of-decrease">убыванию количества игрушек</option>
            </select>
          </div>
          <div class="filter__category">
            <h5 class="filter__title">Категории</h5>
          </div>
          <h5 class="filter__subtitle">Форма</h5>
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
            <h5 class="filter__subtitle">Количество экземпляров</h5>
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
              <h5 class="filter__subtitle">Год приобретения</h5>
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

          <h5 class="filter__subtitle">Цвет</h5>
          <div class="filter__color">
            <button data-color="белый" class="filter__color-btn filter__color-btn_1"></button>
            <button data-color="желтый" class="filter__color-btn filter__color-btn_2"></button>
            <button data-color="красный" class="filter__color-btn filter__color-btn_3"></button>
            <button data-color="синий" class="filter__color-btn filter__color-btn_4"></button>
            <button data-color="зелёный" class="filter__color-btn filter__color-btn_5"></button>
          </div>
          <h5 class="filter__subtitle">Размер</h5>
          <div class="filter__size">
            <input class="filter__checkbox" data-size="большой" type="checkbox" name="" id="big-size" />
            <label class="filter__size-label" for="big-size">Большой</label>
            <input class="filter__checkbox" data-size="средний" type="checkbox" name="" id="avarage-size" />
            <label class="filter__size-label" for="avarage-size">Средний</label>
            <input class="filter__checkbox" data-size="малый" type="checkbox" name="" id="small-size" />
            <label class="filter__size-label" for="small-size">Малый</label>
          </div>
          <input class="filter__checkbox" type="checkbox" name="" id="favorite" />
          <label class="filter__size-label" for="favorite">Любимые</label>
          <div class="filter__reset">
            <button class="button button_main filter__button" id="reset-filters">Сбросить фильтры</button>
            <button class="button button_main filter__button">Сбросить настройки</button>
          </div>
        </div>
        <div class="toys-conteiner" id="toys-conteiner">
        </div>
      </div>
    `;
  afterRenderToysPage();
};

const afterRenderToysPage = () => {
  // Listerner on filters
  listenerForColorFilters();
  listenerForFormFilters();
  listenerForSizeFilters();
  // showFavorite();
  initNoUiSlider(); // initiation double range inputs
  // updateCards();
  initSearch();
  initSort();

  //Listerner for reset filters button
  document.getElementById("reset-filters")?.addEventListener("click", resetFilters);

  // Dispatch event for sorting during rendering
  const event = new Event("change");
  const sort = document.getElementById("sort") as HTMLSelectElement;
  sort.dispatchEvent(event);

  // Focus on search after rendering - one of the requirements
  const search = document.getElementById("search") as HTMLInputElement;
  search.focus();
};

export { renderToysPage };
