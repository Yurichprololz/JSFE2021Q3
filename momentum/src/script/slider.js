const BODY = document.querySelector('body')
const ARROW_PREV = document.querySelector('.arrow_left')
const ARROW_NEXT = document.querySelector('.arrow_rigth')
import { greetingList } from './watch'
import { getLinkToFlickr, getLinkToImage, COLLECTION } from './upload'
let NSlide
function getRandomNum() {
    let rand = Math.floor(Math.random() * (20 - 1) + 1)
    return rand = rand < 10 ? '0' + rand : rand
}
function setBg() {
    const img = new Image();
    if (!NSlide) {
        NSlide = getRandomNum()
    }
    img.src = `https://raw.githubusercontent.com/Yurichprololz/stage1-tasks/assets/images/${getTimeOfDay()}/${NSlide}.jpg`
    img.onload = () => {
        BODY.style.backgroundImage = `url(${img.src})`
    };
}

function getTimeOfDay() {
    let d = new Date
    return greetingList[Math.floor(d.getHours() / 6)]
}
function nextSlide() {
    if (COLLECTION[1].checked === true) {
        getLinkToImage()
    } else if (COLLECTION[2].checked === true) {
        getLinkToFlickr()
    } else {
        NSlide++
        if (NSlide < 10) {
            NSlide = '0' + NSlide
        }
        if (NSlide > 20) {
            NSlide = '01'
        }
        setBg()
    }

}
function prevSlide() {
    if (COLLECTION[1].checked === true) {
        getLinkToImage()
    } else if (COLLECTION[2].checked === true) {
        getLinkToFlickr()
    }
    else {
        NSlide--
        if (NSlide < 10) {
            NSlide = '0' + NSlide
        }
        if (NSlide < 1) {
            NSlide = '20'
        }
        setBg()
    }

}

ARROW_NEXT.addEventListener('click', nextSlide)
ARROW_PREV.addEventListener('click', prevSlide)

export { setBg, NSlide }