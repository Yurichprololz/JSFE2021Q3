const button = document.getElementById('anchor')

document.addEventListener('scroll', () => {
    if (scrollY > 1000) {
        button.classList.add('anchor_active')
        button.addEventListener('click', goUp)
    } else {
        if (button.classList.contains('anchor_active')) {
            button.classList.remove('anchor_active')
            button.removeEventListener('click', goUp)


        }
    }
})

function goUp() {
    window.scrollTo(0, 0)
}