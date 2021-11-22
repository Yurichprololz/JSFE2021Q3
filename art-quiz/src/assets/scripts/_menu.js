import { renderCategories as startAuthorGame } from './_author_game'
import { renderCategories as startPictureGame } from './_picture_game'
import { showSetting, hideSetting } from './_setting';

const refreshLocal = () => {
  if (localStorage.getItem('game')) {
    localStorage.removeItem('game')
  }
  if (localStorage.getItem('authorGameLocal')) {
    const local = JSON.parse(localStorage.getItem('authorGameLocal'))
    for (let i = 0; i < local.length; i += 1) {
      if (local[i] === true) {
        local[i] = false
        localStorage.setItem('authorGameLocal', JSON.stringify(local))
        break
      }
    }
  }
  if (localStorage.getItem('pictureGameLocal')) {
    const local = JSON.parse(localStorage.getItem('pictureGameLocal'))
    for (let i = 0; i < local.length; i += 1) {
      if (local[i] === true) {
        local[i] = false
        localStorage.setItem('pictureGameLocal', JSON.stringify(local))
        break
      }
    }
  }
}

const WRAP = document.querySelector('.main')
const renderMenu = () => {
  refreshLocal()
  WRAP.innerHTML = `<div class="wrap menu">
    <div class="menu__start">
      <h3 class="menu__title">Mode quiz</h3>
      <div class="menu__modes">
        <div class="menu__mode menu__mode_artists menu__button">
          <p>Artists quiz</p>
          <div class="menu__buttonIco menu__buttonIco_artists" data-cat="10"></div>
        </div>

        <div class="menu__mode menu__mode_picture menu__button">
          <p>Pictures quiz</p>
          <div class="menu__buttonIco menu__buttonIco_picture"></div>
        </div>
      </div>
    </div>
    <div class="menu__setting menu__button">
      <p>Setting</p>
    </div>`
  document.querySelector('.menu__mode_artists').addEventListener('click', startAuthorGame)
  document.querySelector('.menu__mode_picture').addEventListener('click', startPictureGame)
  const BUTTON_SETTING = document.querySelector('.menu__setting')
  const BUTON_CLOSE = document.querySelector('.popup__close')
  BUTTON_SETTING.addEventListener('click', showSetting)
  BUTON_CLOSE.addEventListener('click', hideSetting)

}
export { renderMenu }