import { changeTreeListerner } from "./change-tree";
import { changeFonListerner } from "./change-fon";
import { audioListener } from "./audio";
import { snowfallListerner } from "./snowfall";
import { garlandListerner } from "./garland";
import { setSetting } from "./set-setting-tree";
import { getFavorite } from "./card";
import createElement from "./template";
import { resetSettingListerner } from "./reset-setting-tree";
import { ICard } from "./card";

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
    <img class="tree__img" id="tree" src="./assets/images/tree/1.png" alt="tree" usemap="#image-map" />
    <map name="image-map" id="map">
    <area id="area" target="" alt="" title="" href="" coords="252,3,240,10,237,48,214,44,209,64,217,78,197,80,206,99,213,130,206,144,172,127,157,140,188,172,170,192,197,217,162,219,120,209,106,230,190,262,125,262,127,279,178,291,120,309,123,339,179,335,149,362,83,348,73,370,125,396,116,428,31,430,20,459,60,465,52,490,90,505,81,532,11,537,5,571,56,575,32,594,49,617,94,589,100,605,65,621,72,645,123,629,104,671,137,687,164,646,181,701,212,700,224,664,240,668,237,692,281,694,288,659,303,698,333,695,372,688,369,660,434,670,451,653,423,635,456,634,465,609,468,582,439,570,490,567,490,534,438,532,424,504,410,476,448,473,450,440,408,437,411,406,346,418,333,411,363,392,423,373,424,345,379,355,376,327,353,330,352,305,387,305,392,277,341,266,403,240,390,215,351,231,346,218,347,182,329,181,359,157,345,135,309,165,313,126,279,128,274,107,305,83,297,67,272,74,284,54,264,39" shape="poly">
</map>
    <div class="garland" id="garland">
    </div>
  </div>
  <div class="tree-page__column setting-right">
    <h3 class="setting-right__title" >Игрушки</h3>
    <div class="setting-right__toys" id="toys-conteiner">
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
      <button class="button button_main filter__button" id="save">Сохранить</button>
      <button class="button button_main filter__button" id="reset-tree">Сбросить настройки</button>
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
  renderToysCard();
  resetSettingListerner();
  removeAreaEvent();
};

const renderToysCard = () => {
  const collection: ICard[] = getFavorite();
  collection.forEach((el: ICard, index: number) => {
    createToy(el, index);
  });
};
const createToy = (el: ICard, index: number) => {
  const conteiner = document.getElementById("toys-conteiner") as HTMLDivElement;
  const div = createElement<string>("div", "setting-right__item") as HTMLDivElement;
  div.dataset.index = `${index}`;
  const count = createElement<string>("p", "setting-right__count") as HTMLParagraphElement;
  count.textContent = el.count;
  div.append(count);
  for (let i = 0; i < Number(el.count); i++) {
    const img = new Image();
    img.dataset.index = `${index}`;
    img.draggable = true;
    img.classList.add("setting-right__img");
    img.src = `./assets/images/toys/${el.num}.png`;
    img.addEventListener("mousedown", DragNDrop);

    img.ondragstart = function (e: Event) {
      e.preventDefault();
    };

    img.onload = () => {
      div.append(img);
    };
  }

  conteiner.append(div);
};

const checkCount = (el: HTMLDivElement) => {
  const count = el.firstChild as HTMLParagraphElement;
  count.textContent = String(el.childElementCount - 1);
};

const removeAreaEvent = () => {
  const area = document.getElementById("area") as HTMLAreaElement;
  area.addEventListener("click", (event: Event) => {
    event.preventDefault();
  });
};

function DragNDrop(event: MouseEvent) {
  const img = event.target as HTMLImageElement;
  const map = document.getElementById("map") as HTMLMapElement;
  const shiftX = event.clientX - img.getBoundingClientRect().left;
  const shiftY = event.clientY - img.getBoundingClientRect().top;

  img.style.zIndex = "1000";
  img.style.height = "40px";
  img.style.width = "40px";

  // map.append(img);
  document.body.append(img);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX: number, pageY: number) {
    img.style.left = pageX - shiftX + "px";
    img.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event: MouseEvent) {
    const x = event.pageX;
    const y = event.pageY;
    moveAt(x, y);
    isOnTree(event) ? (img.style.cursor = "copy") : (img.style.cursor = "no-drop");
  }
  const isOnTree = (event: MouseEvent): boolean => {
    img.hidden = true;
    const elementMouseIsOver = document.elementFromPoint(event.pageX, event.pageY) as Element;
    img.hidden = false;

    return elementMouseIsOver == document.querySelector("area");
  };

  document.addEventListener("mousemove", onMouseMove);

  img.onmouseup = function (event: MouseEvent) {
    const conteiners = Array.from(document.querySelectorAll(".setting-right__item")) as HTMLDivElement[];
    const parent = conteiners.find((el) => el.dataset.index == img.dataset.index) as HTMLDivElement;

    if (!isOnTree(event)) {
      img.style.width = "80%";
      img.style.height = "80%";
      img.style.left = "";
      img.style.top = "";
      parent.append(img);
    }
    img.style.cursor = "auto";
    checkCount(parent);
    document.removeEventListener("mousemove", onMouseMove);
    img.onmouseup = null;
  };
}

export { renderTreePage };
