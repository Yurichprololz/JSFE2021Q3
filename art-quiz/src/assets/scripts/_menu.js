import { renderCategories as startAuthorGame } from './_author_game'
import { renderCategories as startPictureGame } from './_picture_game'
// import imagesInfo from '../../images';

const WRAP = document.querySelector('.main')
const renderMenu = () => {
  if (localStorage.getItem('game')) {
    localStorage.removeItem('game')
  }
  WRAP.innerHTML = `<div class="wrap menu">
    <div class="menu__start">
      <h3 class="menu__title">Mode quiz</h3>
      <div class="menu__modes">
        <div class="menu__mode menu__button">
          <p>Artists quiz</p>
          <div class="menu__buttonIco menu__buttonIco_artists" data-cat="10"></div>
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