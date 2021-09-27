import "./scss/main.scss"
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './script/gallery'
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

    slidesPerView: 3,
    loop: true,
    spaceBetween: 42,
    mousewheel: {
        sentivity: 1,
    },
});

///
function initComparisons() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }
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
} initComparisons()


console.log(`
оценка - 153 балла 
:
Не выполненные/не засчитанные пункты:
1) кнопке "Book" в форме покупки билетов добавлен ripple-эффект. Демо: https://50projects50days.com/projects/button-ripple-effect/ 

Частично выполненные пункты:
1) вёрстка формы соответствует макету (До конца не стилизовал инпуты в форме)

`);