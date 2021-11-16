import imagesInfo from '../../images';
import { renderMenu } from './_menu'
class Game {
    constructor() {
        this.games = []
    }
}

class AuthorGame {
    constructor() {
        this.trueOpt = null
        this.picture = null
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
        this.picture = this.getRandomPicture()
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
            const round = new AuthorGame()
            round.beforeRender()
            game.push(round)
        }
        localStorage.setItem(`game`, JSON.stringify(game))
    }
    const game = JSON.parse(localStorage.getItem(`game`))

    if (game.every(round => round.isFinited)) {
        showScore(game.filter(el => el.isTrue).length)
        localStorage.removeItem('game')
        // renderMenu()
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

export { AuthorGame, nextRound }