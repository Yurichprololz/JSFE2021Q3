import { setBg } from '../script/slider'
import { greetingList } from './watch'

// const unsplash = document.getElementById('Unsplash')
const COLLECTION = document.querySelectorAll('input[name="collection"]')
const BODY = document.querySelector('body')
const TAGS = document.querySelector('.tags')
let theme

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
    const target = e.target.closest('input')
    if (target.value === '1') {
        setBg()
    } else if (target.value === '2') {
        getLinkToImage()
    } else if (target.value === '3') {
        console.log(3);
    }
}




COLLECTION.forEach((el) => {
    el.addEventListener('change', setServise)

})

TAGS.addEventListener('blur', getLinkToImage)

export { getLinkToImage, COLLECTION }