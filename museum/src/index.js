import "./scss/main.scss"
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './script/gallery'
// Инициализация свайпера
const swiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    speed: 1000,
    spaceBetween: 150,
    mousewheel: {
        sentivity: 1,
    },
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
    },
    slidesPerView: 3,
    loop: true,
    spaceBetween: 42,
    mousewheel: {
        sentivity: 1,
    },
});