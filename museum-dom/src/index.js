import "./scss/main.scss"
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './script/gallery'
import './script/video-player'

initComparisons()
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

    mousewheel: {
        sentivity: 1,
    },
});

///
function initComparisons() {
    var x, i;
    x = document.querySelector(".img-comp-overlay");
    compareImages(x);

    function compareImages(img) {
        var slider, img, clicked = 0, w, h;
        w = img.offsetWidth;
        h = img.offsetHeight;
        img.style.width = (w / 2) + "px";
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        img.parentElement.insertBefore(slider, img);
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchend", slideFinish);
        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
            clicked = 0;
        }
        function slideMove(e) {
            var pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e)
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }
        function getCursorPos(e) {
            var a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}


console.log(`
самооценка - 152 балла (?8) 
:
Не проверил результат проверки скорости сайта для мобильных устройств на момент деплоя.
Остальное запилил.
Хочу напомнить, что проверять разрешение нужно в mobile режиме, т.к. разрешения до 1024 для скрин-экранов(а на декстопе присуствует полоса прокрутки(16-18 пикселей в зависимости от браузера), что может решать для оценки по ПиксельПефекту)
Так же может сразу не перестроится, поэтому можно обнавить или переключить пару раз между мобильным и декстопным модом.

Удачи в следующих заданиях!


`);



/////
const menu = e => {
    // if (!e.target.closest('.adaptive') || !e.target.closest('.menu_link')) return
    // document.querySelector('.nav-menu').classList.toggle('nav-menu_active')
    document.querySelector('.menu_popup').classList.toggle('menu_popup_active')
    // document.querySelector('.menu_popup_content').classList.toggle('menu_popup_content_active')
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
    document.querySelector('.menu_popup_active').classList.remove('menu_popup_active')
    document.querySelector('.adaptive_close').classList.remove('adaptive_close')
    document.querySelector('.welcome-content_close').classList.remove('welcome-content_close')
    console.log(1);
})