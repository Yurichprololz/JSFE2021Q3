import imagesInfo from '../../images';
import { renderMenu } from './_menu'
import { getAudio } from './_setting'
class Game {
    constructor() {
        this.games = []
    }
}

class AuthorGame {
    constructor(picture) {
        this.trueOpt = null
        this.picture = imagesInfo[picture]
        this.arrAuthor = null
        this.OPTIONS = null
        this.isFinited = false
        this.isTrue = false
    }

    render() {
        document.querySelector('.main').innerHTML = `<div class="wrap game">
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
    }

    beforeRender() {
        // this.picture = this.getRandomPicture()
        console.log('pic', this);
        this.trueOpt = this.picture.author
        this.arrAuthor = this.createAuthor(this.picture)
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
    checkOption(event) {
        const target = event.target.closest('.game__answer')
        this.isFinited = true
        const game = JSON.parse(localStorage.getItem(`game`))


        if (this.trueOpt == target.textContent) {
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

    document.querySelectorAll('.categories__cat').forEach(el => {
        el.addEventListener('click', nextRound)
    })
}
const showScore = score => {
    document.querySelector('.main').innerHTML = `
    <div class="info__content">
    <div class="info__name">Congratulations, your score is ${score}</div>
    <button class="nextRound"> Back to menu</button></div>
    `
    document.querySelector('.nextRound').addEventListener('click', renderMenu)
}
const nextRound = (e) => {
    if (!localStorage.hasOwnProperty('game')) {
        let iter = e.target.closest('.categories__cat').dataset.cat;
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
        showScore(game.filter(el => el.isTrue).length)
        getAudio(2)
        localStorage.removeItem('game')
    }
    for (let round of game) {
        if (!round.isFinited) {
            round.__proto__ = new AuthorGame().__proto__
            round.render()
            round.afterRender()
            break
        }
    }
}

export { AuthorGame, renderCategories }