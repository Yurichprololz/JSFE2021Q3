import './scss/main.scss';
import template from './assets/scripts/_template'
import imagesInfo from './images';
import { renderMenu } from './assets/scripts/_menu';
import { showSetting, hideSetting, setLocalStorage, getLocalStorage } from './assets/scripts/_setting';
const templateRequest = 'https://raw.githubusercontent.com/irinainina/image-data/master/img/1.jpg'
renderMenu()
import './assets/scripts/_setting'



const BUTTON_SETTING = document.querySelector('.menu__setting')
const BUTON_CLOSE = document.querySelector('.popup__close')

const fullscreen = document.querySelector('.fullscreen__icon')
document.querySelector('.return__arrow').addEventListener('click', renderMenu)
fullscreen.addEventListener('click', () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen())


window.addEventListener('beforeunload', setLocalStorage)


window.addEventListener('load', getLocalStorage)

BUTTON_SETTING.addEventListener('click', showSetting)
BUTON_CLOSE.addEventListener('click', hideSetting)