import imagesInfo from '../../images';
import { renderMenu } from './_menu'
import { getAudio } from './_setting'
import template from './_template'


class AuthorGame {
  constructor(picture) {
    this.trueOpt = null
    this.picture = imagesInfo[picture]
    this.arrAuthor = null
    this.OPTIONS = null
    this.time = null
    this.isFinited = false
    this.isTrue = false
  }

  render() {
    const main = document.querySelector('.main')
    main.classList.add('main_translate')
    return new Promise(res => {
      setTimeout(() => {
        main.classList.remove('main_translate')
        main.innerHTML = `<div class="wrap game">
     <div class="game__picBlock">
       <img src="./img/${this.picture.imageNum}.jpg" alt="" class="game__pic" />
     </div>
     <div class="game__answers">
       <div class="game__answer game__answer_1"></div>
       <div class="game__answer game__answer_2"></div>
       </div>
       <div class="game__answers">
         <div class="game__answer game__answer_3"></div>
       <div class="game__answer game__answer_4"></div>
       </div>
     </div>`
        res()

      }, 500)
    })




  }
  setupTime() {
    const check = document.getElementById('time_for_round-check')
    if (check.checked === true) {
      this.time = document.getElementById('time_for_round').value
    } else {
      this.time = false
    }
  }
  beforeRender() {
    this.trueOpt = this.picture.author
    this.arrAuthor = this.createAuthor(this.picture)
    this.setupTime()

  }
  afterRender() {
    this.OPTIONS = document.querySelectorAll('.game__answer')
    this.createOptions(this.arrAuthor, this.OPTIONS)
    this.OPTIONS.forEach(el => {
      el.addEventListener('click', (e) => {
        this.checkOption(e, this.trueOpt)
      })
    })
  }
  getRandomPicture() {
    return imagesInfo[Math.floor(Math.random() * imagesInfo.length)]
  }
  createAuthor(picture) {
    let arr = new Set()
    arr.add(picture.author)
    while (arr.size < 4) {
      arr.add(this.getRandomPicture().author)
    }
    return Array.from(arr).sort()
  }
  createOptions(arr, opt) {
    arr.forEach((author, i) => {
      opt[i].textContent = author
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
  win(target) {
    if (target) {
      target.classList.add('game__answer_trueble')
    }
    this.isTrue = true
    getAudio(0)
  }
  lose(target) {
    if (target) {
      target.classList.add('game__answer_falsable')
    }
    getAudio(1)
  }
  unloadGame() {
    const game = JSON.parse(localStorage.getItem(`game`))
    for (let index = 0; index < game.length; index++) {
      if (game[index].picture.name === this.picture.name) {
        game[index] = this
        break
      }
    }
    localStorage.setItem(`game`, JSON.stringify(game))
  }
  checkOption(event) {
    if (document.querySelector('.header__time').classList.contains('header__time_active')) {
      document.querySelector('.header__time').classList = 'header__time'
    }

    const target = event.target.closest('.game__answer')
    this.isFinited = true
    if (this.trueOpt == target.textContent) {
      this.win(target)
    } else {
      this.lose(target)
    }
    this.unloadGame()
    this.showInfo()
  }
  refreshTime() {
    document.querySelector('.header__text').textContent = this.time--
  }
  wacherTime() {
    if (this.time) {
      document.querySelector('.header__text').textContent = this.time--
      document.querySelector('.header__time').classList.add('header__time_active')
      this.wacher = setInterval(() => {
        this.refreshTime()
        if (this.time == 4) {
          document.querySelector('.header__time').classList.add('header__time_little')
        }
        if (this.time < 0) {
          document.querySelector('.header__time').classList = 'header__time'
          clearInterval(this.wacher)
          this.isFinited = true
          this.lose()
          this.unloadGame()
          this.showInfo()
        } else if (!(document.querySelector('.header__time').classList.contains('header__time_active'))) {
          clearInterval(this.wacher)
        }

      }, 1000);

    }
  }

}
const showScore = score => {
  const main = document.querySelector('.main')
  main.classList.add('main_translate')
  setTimeout(() => {

    main.classList.remove('main_translate')
    main.innerHTML = `
    <div class="infoRound__content">
    <div class="infoRound__name">Congratulations! <br> your score is <br> <p>${score}</p> </div>
    <div class="infoRound__buttons">
    <button class="nextRound backToMenu"> Back to menu</button>
    <button class="nextRound backToCategories"> Back to categories</button>
    </div></div>
    `
    document.querySelector('.backToMenu').addEventListener('click', () => {
      main.classList.add('main_translate')
      setTimeout(() => {
        renderMenu()
        main.classList.remove('main_translate')
      }, 500)
    })
    document.querySelector('.backToCategories').addEventListener('click', renderCategories)
  }, 500)

}
const renderCategories = () => {
  const main = document.querySelector('.main')
  main.classList.add('main_translate')
  setTimeout(() => {
    main.classList.remove('main_translate')
    main.innerHTML = `
        <h4 class="categories__title">Choose category</h4>
      <div class="categories">
        <div class="categories__cat" data-cat="0">
          <div class="subtitle">1</div>
          <img src="./img/0.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="10">
          <div class="subtitle">2</div>
          <img src="./img/10.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="20">
          <div class="subtitle">3</div>
          <img src="./img/20.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="30">
          <div class="subtitle">4</div>
          <img src="./img/30.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="40">
          <div class="subtitle">5</div>
          <img src="./img/40.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="50">
          <div class="subtitle">6</div>
          <img src="./img/50.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="60">
          <div class="subtitle">7</div>
          <img src="./img/60.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="70">
          <div class="subtitle">8</div>
          <img src="./img/70.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="80">
          <div class="subtitle">9</div>
          <img src="./img/80.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="90">
          <div class="subtitle">10</div>
          <img src="./img/90.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="100">
          <div class="subtitle">11</div>
          <img src="./img/100.jpg" alt="" />
        </div>
        <div class="categories__cat" data-cat="110">
          <div class="subtitle">12</div>
          <img src="./img/110.jpg" alt="" />
        </div>
      </div>`
    const categories = document.querySelectorAll('.categories__cat')

    if (!localStorage.hasOwnProperty('authorGameLocal')) {
      let authorGameLocal = []
      authorGameLocal.length = categories.length
      authorGameLocal.fill(false)
      localStorage.setItem('authorGameLocal', JSON.stringify(authorGameLocal))
    } else {
      categories.forEach((el, i) => {
        const authorGameLocal = JSON.parse(localStorage.getItem('authorGameLocal'))
        if (authorGameLocal[i] !== false) {
          el.classList.add('categories__cat_finished')
          const info = template('div', 'categories__info')
          info.innerHTML = `Score: ${authorGameLocal[i].filter(el => el === true).length} <br> Click for details`
          info.addEventListener('click', renderResult)
          el.append(info)
        }
      })
    }
    categories.forEach((el) => {
      el.addEventListener('click', nextRound)
    })
  }, 500)
}
const afterRenderResult = (category) => {
  const pictures = document.querySelectorAll('.result__picture')
  const local = JSON.parse(localStorage.getItem('authorGameLocal'))[(+category + 10) / 10 - 1]
  pictures.forEach((el, i) => {
    if (local[i] === true) {
      el.classList.add('result__picture_trueble')
    }
    const img = template('img', '', { src: `./img/${category}.jpg`, 'data-N': `${category++}` })
    el.append(img)
    el.addEventListener('click', renderInfo)
  })
}
const renderInfo = (e) => {
  const content = document.querySelector('.popup__info')
  const picture = imagesInfo[e.target.closest('img').dataset.n]
  content.innerHTML = `
    <div class="info__content">
    <img class="info__pic" src="./img/${picture.imageNum}.jpg" alt="">
    <div class="info__author">${picture.author}</div>
    <div class="info__name">${picture.name}</div>
    <div class="info__year">${picture.year}</div>
    <button class="nextRound"> Close</button></div>
    `
  content.classList.add('popup__info_active')
  document.querySelector('.nextRound').addEventListener('click', () => {
    content.classList.remove('popup__info_active')
  })
}
const renderResult = e => {
  const main = document.querySelector('.main')
  main.classList.add('main_translate')
  setTimeout(() => {
    main.classList.remove('main_translate')
    main.innerHTML = `
    <div class="result">
        <h2 class="result__title"></h2>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
        <div class="result__picture"></div>
      </div>
        `
    let category = e.target.closest('.categories__cat').dataset.cat
    afterRenderResult(category)
  }, 500)
  e.stopPropagation()
}
const nextRound = async (e) => {
  if (!localStorage.hasOwnProperty('game')) {
    let iter = e.target.closest('.categories__cat').dataset.cat;
    let local = JSON.parse(localStorage.getItem('authorGameLocal'))
    local[(+iter + 10) / 10 - 1] = true
    localStorage.setItem('authorGameLocal', JSON.stringify(local))
    const game = []
    while (game.length < 10) {
      const round = new AuthorGame(iter++)
      round.beforeRender()
      game.push(round)
    }
    localStorage.setItem(`game`, JSON.stringify(game))
  }
  const game = JSON.parse(localStorage.getItem(`game`))

  if (game.every(round => round.isFinited)) {
    const result = game.map(el => el.isTrue);
    showScore(result.filter(el => el === true).length)
    getAudio(2)
    const local = JSON.parse(localStorage.getItem('authorGameLocal'))
    // const game1 = JSON.parse(localStorage.getItem('game'))
    for (let i = 0; i < local.length; i++) {
      if (local[i] === true) {
        local[i] = result
        localStorage.setItem('authorGameLocal', JSON.stringify(local))
        break
      }
    }
    localStorage.removeItem('game')
  }
  for (let round of game) {
    if (!round.isFinited) {
      round.__proto__ = new AuthorGame().__proto__
      round.render()
        .then(() => round.afterRender())
        .then(() => round.wacherTime())
      break
    }
  }
}

export { AuthorGame, renderCategories }