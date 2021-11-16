import imagesInfo from '../../images';
import { renderMenu } from './_menu'

class PictureGame {
    constructor() {
        this.trueOpt = null
        this.picture = null
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
        this.picture = this.getRandomPicture()
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
        return imagesInfo[Math.floor(Math.random() * imagesInfo.length)]
    }
    createPictureNun(picture) {
        let arr = new Set()
        arr.add(picture.imageNum)
        while (arr.size < 4) {
            arr.add(this.getRandomPicture().imageNum)
        }
        return Array.from(arr).sort()
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
            target.classList.add('game__answer_trueble')
        } else {
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
const showScore = score => {
    document.querySelector('.main').innerHTML = `
    <div class="info__content">
    <div class="info__name">Congratulations, your score is ${score}</div>
    <button class="nextRound"> Back to menu</button></div>
    `
    document.querySelector('.nextRound').addEventListener('click', renderMenu)
}
const nextRound = () => {
    if (!localStorage.hasOwnProperty('game')) {
        const game = []
        while (game.length < 10) {
            const round = new PictureGame()
            round.beforeRender()
            game.push(round)
        }
        localStorage.setItem(`game`, JSON.stringify(game))
    }
    const game = JSON.parse(localStorage.getItem(`game`))

    if (game.every(round => round.isFinited)) {
        showScore(game.filter(el => el.isTrue).length)
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

export { PictureGame, nextRound }