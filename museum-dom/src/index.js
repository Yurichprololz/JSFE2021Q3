import "./scss/main.scss"
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './script/gallery'
import './script/video-player'
import initComparisons from './script/picSlide'
import './script/mapbox'
import { removeStyle } from './script/video-player'
import './script/ticketCalc'
import './script/up_button'
// setTimeout(() => , 110)


// Инициализация свайпера
const swiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    speed: 1000,
    spaceBetween: 150,

});

// Кастомная фракция
document.querySelector('.castom-slider-total').innerHTML = '0' + (swiper.slides.length - 2)
let currentSlides = document.querySelector('.castom-slider-current')
swiper.on('slideChange', function () {
    let currentSlide = ++swiper.realIndex
    currentSlides.innerHTML = '0' + currentSlide
})


// Инициализация видео свайпера
const swiperVideo = new Swiper('.swiper-video', {
    pagination: {
        el: '.swiper-video-pagination',
        type: 'bullets',
        clickable: true,

    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    loop: true,
    breakpoints: {
        320: {
            spaceBetween: 20,
            slidesPerView: 2,
        },
        421: {
            spaceBetween: 20,
            slidesPerView: 2,
        },
        769: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1025: {
            slidesPerView: 3,
            spaceBetween: 42,
        },
    },


});

///
const video = document.querySelector('.viewer')
const swiperV = document.querySelector('.swiper-video')


swiperVideo.on('slideChangeTransitionEnd', function () {
    video.src = `${swiperV.querySelector('.swiper-slide-active').dataset.url}`
    video.poster = `${swiperV.querySelector('.swiper-slide-active').dataset.poster}`
    const progress = document.querySelector('.progress')
    removeStyle()

});


/////
const menu = e => {
    document.querySelector('.menu_popup').classList.toggle('menu_popup_active')
    document.querySelector('.adaptive').classList.toggle('adaptive_close')
    document.querySelector('.welcome-content').classList.toggle('welcome-content_close')
}
document.querySelector('.adaptive').addEventListener('click', menu)
document.querySelectorAll('.menu_link').forEach((l) => {
    l.addEventListener('click', menu)
})


let btn = document.querySelector('.buy')
btn.addEventListener('click', () => {
    popup.classList.toggle('popup_active')

})
document.querySelector('.popup__close').addEventListener('click', (e) => {
    popup.classList.toggle('popup_active')
    e.preventDefault()

})
document.querySelector('.popup__area').addEventListener('click', (e) => {
    popup.classList.toggle('popup_active')
    e.preventDefault()

})
document.addEventListener('click', e => {
    if (e.target.closest('.menu_popup') || e.target.closest('.adaptive_close')) return
    if (!document.querySelector('.menu_popup_active')) return
    document.querySelector('.menu_popup_active').classList.remove('menu_popup_active')
    document.querySelector('.adaptive_close').classList.remove('adaptive_close')
    document.querySelector('.welcome-content_close').classList.remove('welcome-content_close')
})

window.addEventListener('load', () => {
    initComparisons()
})