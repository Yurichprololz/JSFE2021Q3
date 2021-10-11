// get elements
const video = document.querySelector('.viewer')
const playBig = document.querySelector('.play-btn')
const playSm = document.querySelector('.sm-play-btn')
const fullScreen = document.querySelector('.sq-btn')
const conteiner = document.querySelector('.video-pl')
const progress = document.querySelector('.progress')
const progressVolume = document.querySelector('.progress-vol')
const volBtn = document.querySelector('.volume-btn')
const playBackDiv = document.querySelector('.playBackRate')





//function

function togglePlay() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
    toggleStyle()
}
function toggleStyle() {
    playBig.classList.toggle('play-btn_hide')
    playSm.classList.toggle('sm-play-btn_paused')
}
function removeStyle() {
    // progress.value = '0'
    if (playBig.classList.contains('play-btn_hide')) {
        playBig.classList.remove('play-btn_hide')
        playSm.classList.remove('sm-play-btn_paused')
    }
}
function fullScreenF() {
    document.fullscreenElement ? document.exitFullscreen() : conteiner.requestFullscreen()
}

function changeTime() {
    video.currentTime = (progress.value * video.duration) / 100
}
function timeUp() {
    progress.value = (video.currentTime / video.duration) * 100
    if (!video.currentTime) {
        progress.value = '0'
    }
    if (progress.value == 100) {
        toggleStyle()
        progress.value = 0
    }
}
function changeVol() {
    video.volume = progressVolume.value
    if (video.volume == 0) {
        volBtn.classList.add('volume-btn_mute')
    } else {
        if (volBtn.classList.contains('volume-btn_mute')) {
            volBtn.classList.remove('volume-btn_mute')

        }
    }
}
function toggleVolume() {
    if (volBtn.classList.contains('volume-btn_mute')) {
        progressVolume.value = 0.5
        changeVol()
    } else {
        progressVolume.value = 0
        changeVol()
    }
}
function increaseBackRate() {
    if (video.playbackRate < 2) {
        video.playbackRate += 0.25
    }
    showBackRate()
}
function decreaseBackRate() {
    if (video.playbackRate > 0.25) {
        video.playbackRate -= 0.25
    }
    showBackRate()
}
function showBackRate() {
    playBackDiv.textContent = `Speed rate - ${video.playbackRate}`
    playBackDiv.classList.add('playBackRate_show')
    setTimeout(() => playBackDiv.classList.remove('playBackRate_show'), 2000)
}

function hotKey(event) {
    if (event.shiftKey) {
        if (event.code === 'Period') {
            increaseBackRate()
        } else if (event.code === 'Comma') {
            decreaseBackRate()
        }
    }
    switch (event.code) {
        case 'Space':
            event.preventDefault()
            togglePlay()
            break;
        case 'KeyM':
            toggleVolume()
            break;
        case 'KeyF':
            fullScreenF()
            break;
        default:
            break;
    }


}

/// Event Listener

playBig.addEventListener('click', togglePlay)
playSm.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', timeUp)
fullScreen.addEventListener('click', fullScreenF)
progress.addEventListener('change', changeTime)
progressVolume.addEventListener('change', changeVol)
volBtn.addEventListener('click', toggleVolume)
document.addEventListener('keydown', hotKey)



export { removeStyle };
