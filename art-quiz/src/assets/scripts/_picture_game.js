import imagesInfo from '../../images';
import { renderMenu } from './_menu'
import { getAudio } from './_setting'


class PictureGame {
  constructor(picture) {
    this.trueOpt = null
    this.picture = imagesInfo[picture]
    this.arrPictureNum = null
    this.OPTIONS = null
    this.isFinited = false
    this.isTrue = false
  }

  render() {
    document.querySelector('.main').innerHTML = `
        <div class="wrap game gamePic">
        <div class="gamePic__question">
          Какую картину написал ${this.picture.author} ? 
        </div>
        <div class="gamePic__answers">
          <div class="gamePic__answer gamePic__answer_1">
            <img src="./img/0.jpg" alt="">
          </div>
          <div class="gamePic__answer gamePic__answer_2">
            <img src="./img/0.jpg" alt="">
          </div>
          </div>
          <div class="gamePic__answers">
            <div class="gamePic__answer gamePic__answer_3">
            <img src="./img/0.jpg" alt="">
            </div>
          <div class="gamePic__answer gamePic__answer_4">
            <img src="./img/0.jpg" alt="">
          </div>
          </div>
        </div>
      </div> `
  }

  beforeRender() {
    // this.picture = this.getRandomPicture()
    this.trueOpt = this.picture.imageNum
    this.arrPictureNum = this.createPictureNun(this.picture)
  }
  afterRender() {
    this.OPTIONS = document.querySelectorAll('.gamePic__answer img')
    this.createOptions(this.arrPictureNum, this.OPTIONS)
    this.OPTIONS.forEach(el => {
      el.addEventListener('click', (e) => {
        this.checkOption(e, this.trueOpt)
      })
    })
  }
  getRandomPicture() {
    return imagesInfo[Math.floor(Math.random() * imagesInfo.length - Math.floor(imagesInfo.length / 2) + Math.floor(imagesInfo.length / 2))]
  }
  createPictureNun(picture) {
    let arr = []
    let arrPainter = new Set()
    arr.push(picture.imageNum)
    arrPainter.add(picture.author)
    while (arr.length < 4) {
      const img = this.getRandomPicture()
      if (!arrPainter.has(img)) {
        arrPainter.add(img.author)
        arr.push(img.imageNum)
      }

    }
    return arr.sort()
  }
  createOptions(arr, opt) {
    arr.forEach((imageNum, i) => {
      opt[i].opt = imageNum
      opt[i].src = `./img/${imageNum}.jpg`
    })
  }
  showInfo() {
    const content = document.querySelector('.popup__info')
    content.innerHTML = `
        <div class="info__content">
        <img class="info__pic" src="./img/${this.picture.imageNum}.jpg" alt="">
        <div class="info__author">${this.picture.author}</div>
        <div class="info__name">${this.picture.name}</div>
        <div class="info__year">${this.picture.year}</div>
        <button class="nextRound"> next round</button></div>
        `
    content.classList.add('popup__info_active')
    document.querySelector('.nextRound').addEventListener('click', () => {
      content.classList.remove('popup__info_active')
      nextRound()
    })
  }
  checkOption(event) {
    const target = event.target.closest('img')
    this.isFinited = true
    const game = JSON.parse(localStorage.getItem(`game`))


    if (this.trueOpt == target.opt) {
      this.isTrue = true
      getAudio(0)
      target.classList.add('game__answer_trueble')
    } else {
      getAudio(1)
      target.classList.add('game__answer_falsable')
    }
    for (let index = 0; index < game.length; index++) {
      if (game[index].picture.name === this.picture.name) {
        game[index] = this
        break
      }
    }
    localStorage.setItem(`game`, JSON.stringify(game))
    this.showInfo()

  }
  startGame() {
    this.beforeRender()
    this.render()
    this.afterRender()
  }

}
const renderCategories = () => {
  document.querySelector('.main').innerHTML = `
        <h4 class="categories__title">Choose category</h4>
      <div class="categories">
        <div class="categories__cat" data-cat="0">
          <div class="subtitle">1</div>
          <img src="./img/120.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="10">
          <div class="subtitle">2</div>

          <img src="./img/130.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="20">
          <div class="subtitle">3</div>

          <img src="./img/140.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="30">
          <div class="subtitle">4</div>

          <img src="./img/150.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="40">
          <div class="subtitle">5</div>

          <img src="./img/160.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="50">
          <div class="subtitle">6</div>

          <img src="./img/170.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="60">
          <div class="subtitle">7</div>

          <img src="./img/180.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="70">
          <div class="subtitle">8</div>

          <img src="./img/190.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="80">
          <div class="subtitle">9</div>

          <img src="./img/200.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="90">
          <div class="subtitle">10</div>

          <img src="./img/210.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="100">
          <div class="subtitle">11</div>

          <img src="./img/220.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="110">
          <div class="subtitle">12</div>
          <img src="./img/230.jpg" alt="" />
        </div>
      </div>`

  document.querySelectorAll('.categories__cat').forEach(el => {
    el.addEventListener('click', nextRound)
  })
}
const showScore = score => {
  document.querySelector('.main').innerHTML = `
    <div class="infoRound__content">
    <div class="infoRound__name">Congratulations, your score is ${score}</div>
    <div class="infoRound__buttons">
    <button class="nextRound backToMenu"> Back to menu</button>
    <button class="nextRound backToCategories"> Back to categories</button>
    </div></div>
    `
  document.querySelector('.backToMenu').addEventListener('click', renderMenu)
  document.querySelector('.backToCategories').addEventListener('click', renderCategories)
}
const nextRound = e => {
  if (!localStorage.hasOwnProperty('game')) {
    let iter = e.target.closest('.categories__cat').dataset.cat;
    const game = []
    while (game.length < 10) {
      const round = new PictureGame(iter++)
      round.beforeRender()
      game.push(round)
    }
    localStorage.setItem(`game`, JSON.stringify(game))
  }
  const game = JSON.parse(localStorage.getItem(`game`))

  if (game.every(round => round.isFinited)) {
    showScore(game.filter(el => el.isTrue).length)
    getAudio(2)
    localStorage.removeItem('game')
  }
  for (let round of game) {
    if (!round.isFinited) {
      round.__proto__ = new PictureGame().__proto__
      round.render()
      round.afterRender()
      break
    }
  }
}

export { PictureGame, renderCategories, showScore }