const picture = document.querySelector('.pic-tickets')
const pictures = [
    './assets/img/background_louvre.jpg',
    './assets/img/welcome-slider/1.jpg',
    './assets/img/welcome-slider/2.jpg',
    './assets/img/welcome-slider/3.jpg',
    './assets/img/welcome-slider/4.jpg',
    './assets/img/welcome-slider/5.jpg',
    './assets/img/buy_tickets.jpg',
]

let currentIndex = 0;
setInterval(function () {
    picture.classList.add('pic-tickets_hide')
    picture.src = pictures[currentIndex];
    currentIndex++;
    if (currentIndex >= pictures.length) {
        currentIndex = 0;
    }
    picture.classList.remove('pic-tickets_hide')
}, 20000);