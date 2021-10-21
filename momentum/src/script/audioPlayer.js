import playList from './playList';
const AUDIO = document.querySelector('audio')
const PLAY_BTN = document.querySelector('.audio__play')
const PREV_BTN = document.querySelector('.audio__prev')
const NEXT_BTN = document.querySelector('.audio__next')
const PLAY_LIST = document.querySelector('.audio__list')
const progress = document.querySelector('.progress')
const progressVolume = document.querySelector('.progress-vol')
const volBtn = document.querySelector('.audio__vol')
let isPlay = false
let count = 0

function playA() {
    if (isPlay) {
        updateSmallBTN()
        AUDIO.pause()
        isPlay = false
        PLAY_BTN.classList.remove('audio__play_pause')
    } else {
        updateSmallBTN()
        AUDIO.play()
        isPlay = true
        PLAY_BTN.classList.add('audio__play_pause')
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
    AUDIO.src = playList[count].src
    AUDIO.currentTime = 0
    AUDIO.play()
    isPlay = true

}

function playSM(e) {
    const target = e.target.closest('.audio__play_sm')
    debugger
    if (count === target.dataset.index) {
        updateSmallBTN()
        playA()
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
    let arr = document.querySelectorAll('.audio__play_sm')
    arr.forEach((el) => {
        el.classList = 'audio__play audio__play_sm'
    })
    arr[count].classList.add('audio__play_pause')
}

function createList() {
    playList.forEach((elem, i, arr) => {
        const conteiner = document.createElement('div')
        const icon = document.createElement('div')
        icon.dataset.index = i
        icon.classList.add('audio__play', 'audio__play_sm')
        icon.addEventListener('click', playSM)
        conteiner.textContent = elem.title
        conteiner.classList.add('audio__conteiner')
        conteiner.prepend(icon)
        PLAY_LIST.append(conteiner)
    })
}

function changeTime() {
    AUDIO.currentTime = (progress.value * AUDIO.duration) / 100
}
function timeUp() {
    progress.value = (AUDIO.currentTime / AUDIO.duration) * 100
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


