import { changeTreeListerner } from "./change-tree";
import { changeFonListerner } from "./change-fon";
import { audioListener } from "./audio";
import { snowfallListerner } from "./snowfall";
import { garlandListerner } from "./garland";
import { setSetting } from "./set-setting-tree";

const renderTreePage = (): void => {
  const main = document.getElementById("main") as HTMLElement;
  if (main.classList.contains("main_toys")) {
    main.classList.remove("main_toys");
  }
  main.innerHTML = `
  <div class="tree-page">
  <div class="tree-page__column setting-left">
    <div class="setting-left__buttons">
      <div class="setting-left__volume volume" id="audio-btn"></div>
      <div class="setting-left__snowfall snowfall" id="showfall-btn"></div>
      <audio src="./assets/audio/audio.mp3" id="audio"></audio>
    </div>
    <div class="setting-left__tree">
      <h3 class="setting-left__title">Выберите Ёлку</h3>
      <div class="setting-left__tree-wrap tree-wrap">
        <div class="tree-wrap_tree" data-path="1">
          <img class="tree-wrap_img" src="./assets/images/tree-icon/1.png" alt="" />
        </div>
        <div class="tree-wrap_tree" data-path="2">
          <img class="tree-wrap_img" src="./assets/images/tree-icon/2.png" alt="" />
        </div>
        <div class="tree-wrap_tree" data-path="3">
          <img class="tree-wrap_img" src="./assets/images/tree-icon/3.png" alt="" />
        </div>
        <div class="tree-wrap_tree" data-path="4">
          <img class="tree-wrap_img" src="./assets/images/tree-icon/4.png" alt="" />
        </div>
        <div class="tree-wrap_tree" data-path="5">
          <img class="tree-wrap_img" src="./assets/images/tree-icon/5.png" alt="" />
        </div>
        <div class="tree-wrap_tree" data-path="6">
          <img class="tree-wrap_img" src="./assets/images/tree-icon/6.png" alt="" />
        </div>
      </div>
    </div>
    <div class="setting-left__fon">
      <h3 class="setting-left__title">Выберите Фон</h3>
      <div class="setting-left__fon-wrap fon-wrap">
        <div class="fon-wrap__item fon-wrap__item_1" data-path="1"></div>
        <div class="fon-wrap__item fon-wrap__item_2" data-path="2"></div>
        <div class="fon-wrap__item fon-wrap__item_3" data-path="3"></div>
        <div class="fon-wrap__item fon-wrap__item_4" data-path="4"></div>
        <div class="fon-wrap__item fon-wrap__item_5" data-path="5"></div>
        <div class="fon-wrap__item fon-wrap__item_6" data-path="6"></div>
        <div class="fon-wrap__item fon-wrap__item_7" data-path="7"></div>
        <div class="fon-wrap__item fon-wrap__item_8" data-path="8"></div>
      </div>
    </div>

    <div class="setting-left__garland">
      <h3 class="setting-left__title">Гирлянда</h3>
      <div class="setting-left__garland-wrap garland-wrap">
        <button class="garland-wrap__button garland-wrap__button_red" data-color="red"></button>
        <button class="garland-wrap__button garland-wrap__button_blue" data-color="blue"></button>
        <button class="garland-wrap__button garland-wrap__button_green" data-color="green"></button>
        <button class="garland-wrap__button garland-wrap__button_yellow" data-color="yellow"></button>
        <button class="garland-wrap__button garland-wrap__button_multi" data-color="multi"></button>
      </div>
    </div>
  </div>
  <div class="tree-page__tree tree">
    <img class="tree__img" id="tree" src="./assets/images/tree/1.png" alt="tree" />
    <div class="garland" id="garland">
    </div>
  </div>
  <div class="tree-page__column setting-right">
    <h3 class="setting-right__title">Игрушки</h3>
    <div class="setting-right__toys">
      <div class="setting-right__item"></div>
    </div>
    <h3 class="setting-right__title">Вы нарядили</h3>
    <div class="setting-right__local">
      <div class="setting-right__save" data-path="1">
        <img class="tree-wrap_img" src="./assets/images/tree-icon/1.png" alt="" />
      </div>
      <div class="setting-right__save" data-path="2">
        <img class="tree-wrap_img" src="./assets/images/tree-icon/2.png" alt="" />
      </div>
      <div class="setting-right__save" data-path="3">
        <img class="tree-wrap_img" src="./assets/images/tree-icon/3.png" alt="" />
      </div>
      <div class="setting-right__save" data-path="4">
        <img class="tree-wrap_img" src="./assets/images/tree-icon/4.png" alt="" />
      </div>
      <div class="setting-right__save" data-path="5">
        <img class="tree-wrap_img" src="./assets/images/tree-icon/5.png" alt="" />
      </div>
      <div class="setting-right__save" data-path="6">
        <img class="tree-wrap_img" src="./assets/images/tree-icon/6.png" alt="" />
      </div>
    </div>
    <div class="filter__reset">
      <button class="button button_main filter__button" id="reset-filters">Сохранить</button>
      <button class="button button_main filter__button" id="reset-setting">Сбросить настройки</button>
    </div>
  </div>
</div>
      `;
  afterRenderToysPage();
};

const afterRenderToysPage = (): void => {
  changeTreeListerner();
  changeFonListerner();
  audioListener();
  snowfallListerner();
  garlandListerner();
  setSetting();
};

export { renderTreePage };
