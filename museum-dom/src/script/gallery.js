const pictureInnerContainer = document.querySelector('.collection-inner');
let arrPic = []
function getImg() {

    pictureInnerContainer.querySelectorAll('img')
        .forEach((pic, i, a) => {
            let arrEl = []
            arrEl.push(pic.src)
            arrEl.push(pic.className)
            arrPic.push(arrEl)
        })
}
const addImg = function () {
    pictureInnerContainer.innerHTML = `<span class="empty">&nbsp; </span>
    <span class="empty2"> &nbsp;</span>`
    for (let i = 0; i < arrPic.length; i++) {
        const img = document.createElement('img');
        img.classList.add(arrPic[i][1])
        img.src = `${arrPic[i][0]}`;
        img.alt = `galery${i}`;
        pictureInnerContainer.append(img);
    }

}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

getImg()
shuffle(arrPic)
addImg()
