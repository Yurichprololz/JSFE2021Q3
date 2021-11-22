import './scss/main.scss';
import { renderMenu } from './assets/scripts/_menu';
import { setLocalStorage, getLocalStorage } from './assets/scripts/_setting';

renderMenu()

const fullscreen = document.querySelector('.fullscreen__icon');
document.querySelector('.return__arrow').addEventListener('click', () => {
    const main = document.querySelector('.main');
    if (main.querySelector('.menu__start')) {
        return;
    }
    if (document.querySelector('.header__time').classList.contains('header__time_active')) {
        document.querySelector('.header__time').classList = 'header__time';
    }
    main.classList.add('main_translateToY');
    setTimeout(() => {
        main.classList.remove('main_translateToY');
        renderMenu();
    }, 500);
});
fullscreen.addEventListener('click', () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()));

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
console.log(`
    Всем доброго времени суток.
        Выполненные анимации:
    1. Изменение основного блока приложения при изменении содержимого ДОМ-дерева(влево и вверх при рендеринге домашней страницы)
    2. Плавное всплытие попапа(настройки, информация об изображениях)
    3. Красиво выезжание таблички с отсчётм времени.(При указаниии в настройках игры на время)
    4. Анимация цифр, указывающее, что в раунде скоро истекает время, при достижении 5 секунд(в настройках должно указано время от 10 секунд)
        Дополнительный функционал:
    1. Возможность открытия приложения в полноэкранный формат +2
`);