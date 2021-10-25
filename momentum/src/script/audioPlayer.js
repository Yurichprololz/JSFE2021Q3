import playList from './playList';
const AUDIO = document.querySelector('audio')
const PLAY_BTN = document.querySelector('.audio__play')
const PREV_BTN = document.querySelector('.audio__prev')
const NEXT_BTN = document.querySelector('.audio__next')
const PLAY_LIST = document.querySelector('.audio__list')
const progress = document.querySelector('.progress')
const progressVolume = document.querySelector('.progress-vol')
const volBtn = document.querySelector('.audio__vol')
const CURRENT_TIME = document.querySelector('.progress__current')
const DURATION_TIME = document.querySelector('.progress__duration')
const TITLE = document.querySelector('.audio__title')
let arr
let isPlay = false
let count = 0

function playA() {
    if (isPlay) {
        updateSmallBTN()
        AUDIO.pause()
        isPlay = false
        PLAY_BTN.classList.remove('audio__play_pause')
        arr[count].classList.remove('audio__play_pause')
    } else {
        updateSmallBTN()
        AUDIO.play()
        isPlay = true
        PLAY_BTN.classList.add('audio__play_pause')
        arr[count].classList.add('audio__play_pause')
        arr.forEach((el) => {
            el.parentNode.lastChild.classList = ''
        })
        arr[count].parentNode.lastChild.classList.add('highlight')

    }
}

function nextSound() {
    count++
    count = count > playList.length - 1 ? 0 : count
    changeSound()
}
function prevSound() {
    count--
    count = count < 0 ? playList.length - 1 : count
    changeSound()
}

function changeSound() {
    updateSmallBTN()
    TITLE.textContent = playList[count].title
    AUDIO.src = playList[count].src
    AUDIO.currentTime = 0
    isPlay = false
    playA()

}

function playSM(e) {
    const target = e.target.closest('.audio__play_sm')
    if (count === target.dataset.index) {
        updateSmallBTN()
        playA()
        if (target.classList.contains('audio__play_pause')) {
            target.classList.remove('audio__play_pause')
        } else {
            target.classList.add('audio__play_pause')
        }
        if (isPlay) {
            target.classList.add('audio__play_pause')
            PLAY_BTN.classList.add('audio__play_pause')
        } else {
            target.classList.remove('audio__play_pause')
            PLAY_BTN.classList.remove('audio__play_pause')
        }
    } else {
        count = target.dataset.index
        AUDIO.src = playList[count].src
        PLAY_BTN.classList.toggle('audio__play_pause')
        target.classList.toggle('audio__play_pause')
        AUDIO.src = playList[count].src
        AUDIO.currentTime = 0
        isPlay = false
        if (!isPlay) {
            playA()
        } else {
            updateSmallBTN()

        }
    }
}

function updateSmallBTN() {
    arr.forEach((el) => {
        el.classList = 'audio__play audio__play_sm'
    })
}

function createList() {
    playList.forEach((elem, i, arr) => {
        const conteiner = document.createElement('div')
        const icon = document.createElement('div')
        const text = document.createElement('div')
        icon.dataset.index = i
        icon.classList.add('audio__play', 'audio__play_sm')
        icon.addEventListener('click', playSM)
        text.textContent = elem.title
        conteiner.classList.add('audio__conteiner')
        conteiner.prepend(text)
        conteiner.prepend(icon)
        PLAY_LIST.append(conteiner)
    })
    TITLE.textContent = playList[count].title

    arr = document.querySelectorAll('.audio__play_sm')

}

function changeTime() {
    AUDIO.currentTime = (progress.value * AUDIO.duration) / 100
}
function getTime(time) {
    time = Math.floor(time)
    let minutes = Math.floor(time / 60)
    minutes = minutes < 10 ? '0' + minutes : minutes
    let seconds = Math.floor(time % 60)
    seconds = seconds < 10 ? '0' + seconds : seconds
    return `${minutes}:${seconds}`
}
function timeUp() {
    progress.value = (AUDIO.currentTime / AUDIO.duration) * 100
    CURRENT_TIME.textContent = getTime(AUDIO.currentTime)
    DURATION_TIME.textContent = getTime(AUDIO.duration)
    if (!AUDIO.currentTime) {
        progress.value = '0'
    }
    if (progress.value == 100) {
        // toggleStyle()
        progress.value = 0
    }
}
function changeVol() {
    AUDIO.volume = progressVolume.value
    if (AUDIO.volume == 0) {
        volBtn.classList.add('audio__vol_mute')
    } else {
        if (volBtn.classList.contains('audio__vol_mute')) {
            volBtn.classList.remove('audio__vol_mute')

        }
    }
}
function toggleVolume() {
    if (volBtn.classList.contains('audio__vol_mute')) {
        progressVolume.value = 0.5
        changeVol()
    } else {
        progressVolume.value = 0
        changeVol()
    }
}

createList()
volBtn.addEventListener('click', toggleVolume)
PLAY_BTN.addEventListener('click', playA)
PREV_BTN.addEventListener('click', prevSound)
NEXT_BTN.addEventListener('click', nextSound)
progress.addEventListener('change', changeTime)
progressVolume.addEventListener('change', changeVol)
AUDIO.addEventListener('timeupdate', timeUp)
setInterval(() => {
    if (AUDIO.currentTime === AUDIO.duration) {
        nextSound()
    }
}, 1000)


