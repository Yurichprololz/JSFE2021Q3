let imagesInfo
(async function getInfo() {
    const info = '../../images.json';
    const res = await fetch(info);
    const data = await res.json();
    imagesInfo = data
})()

export { imagesInfo }