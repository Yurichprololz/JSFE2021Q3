import { setBg } from '../script/slider'
import { greetingList } from './watch'

const COLLECTION = document.querySelectorAll('input[name="collection"]')
const BODY = document.querySelector('body')
const TAGS = document.querySelector('.tags')
let theme
let countFlickr = 0

async function getLinkToImage() {
    theme = changeTheme()
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${theme}&client_id=duvdvGTUFDbTYkjkLsQ0QEglVpHsGolMKd42utulHLg`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular
    img.onload = () => {
        BODY.style.backgroundImage = `url(${img.src})`
    };
}
async function getLinkToFlickr() {
    theme = changeTheme()
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=64bf5641a6412722f9b2f398b9f8bafa&tags=${theme}&extras=url_l&format=json&nojsoncallback=1`
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.photos.photo[countFlickr++].url_l
    img.onload = () => {
        BODY.style.backgroundImage = `url(${img.src})`
    };
}

function getTimeOfDay() {
    let d = new Date
    return greetingList[Math.floor(d.getHours() / 6)]
}

function changeTheme() {
    if (!TAGS.value) {
        return getTimeOfDay()
    } else {
        return TAGS.value
    }
}

function setServise(e) {
    if (COLLECTION[0].checked === true) {
        setBg()
    } else if (COLLECTION[1].checked === true) {
        getLinkToImage()
    } else if (COLLECTION[2].checked === true) {
        getLinkToFlickr()
    }
}




COLLECTION.forEach((el) => {
    el.addEventListener('change', setServise)

})

TAGS.addEventListener('blur', setServise)

export { getLinkToFlickr, getLinkToImage, COLLECTION }