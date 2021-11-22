async function getInfo() {
    const info = '../images.json';
    const res = await fetch(info);
    const data = await res.json();
    return data
}
let imagesInfo
(async () => {
    imagesInfo = await getInfo();
})();

export { imagesInfo }