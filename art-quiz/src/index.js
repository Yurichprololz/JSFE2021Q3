import './scss/main.scss';
// import template from './assets/scripts/_template'
// import imagesInfo from './images';
import { renderMenu } from './assets/scripts/_menu';
import { setLocalStorage, getLocalStorage } from './assets/scripts/_setting';
const templateRequest = 'https://raw.githubusercontent.com/irinainina/image-data/master/img/1.jpg'
renderMenu()
import './assets/scripts/_setting'


const fullscreen = document.querySelector('.fullscreen__icon')
document.querySelector('.return__arrow').addEventListener('click', () => {
    const main = document.querySelector('.main')
    if (main.querySelector('.menu__start')) {
        return
    }
    main.classList.add('main_translateToY')
    setTimeout(() => {
        main.classList.remove('main_translateToY')
        renderMenu()
    }, 500)
})
fullscreen.addEventListener('click', () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen())

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)
