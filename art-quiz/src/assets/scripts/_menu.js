import { nextRound as startAuthorGame } from './_author_game'
import { nextRound as startPictureGame } from './_picture_game'

const WRAP = document.querySelector('.main')
const renderMenu = () => {
    WRAP.innerHTML = `<div class="wrap menu">
    <div class="menu__start">
      <h3 class="menu__title">Mode quiz</h3>
      <div class="menu__modes">
        <div class="menu__mode menu__button">
          <p>Artists quiz</p>
          <div class="menu__buttonIco menu__buttonIco_artists"></div>
        </div>

        <div class="menu__mode menu__button">
          <p>Pictures quiz</p>
          <div class="menu__buttonIco menu__buttonIco_picture"></div>
        </div>
      </div>
    </div>
    <div class="menu__setting menu__button">
      <p>Setting</p>
    </div>`
    document.querySelector('.menu__buttonIco_artists').addEventListener('click', startAuthorGame)
    document.querySelector('.menu__buttonIco_picture').addEventListener('click', startPictureGame)

}
export { renderMenu }