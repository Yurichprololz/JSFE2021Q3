const ToDoList = document.querySelector('.todo')
const INPUT = document.querySelector('.todo__text')
const CREATE_BTN = document.querySelector('.todo__create')
const AREA = document.querySelector('.todo__area')
const OPEN_BTN = document.querySelector('.todo_icon')


function createList() {
    const container = document.createElement('div')
    const text = document.createElement('span')
    const del = document.createElement('button')
    if (INPUT.value) {
        text.textContent = INPUT.value
        INPUT.value = ''
        if (INPUT.classList.contains('invalid')) {
            INPUT.classList.remove('invalid')
        }
    } else {
        INPUT.classList.add('invalid')
        return
    }
    del.classList.add('delete')
    del.addEventListener('click', removeElement)
    container.classList.add('conteiner')
    container.prepend(del)
    container.prepend(text)
    AREA.prepend(container)
}

function removeElement(e) {
    const elem = e.target.closest('.conteiner')
    elem.remove()

}
function setLocalStorage() {
    localStorage.setItem('list', AREA.innerHTML);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('list')) {
        AREA.innerHTML = localStorage.getItem('list');
        document.querySelectorAll('.delete').forEach((el) => {
            el.addEventListener('click', removeElement)
        })
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.todo_icon')) return
    if (e.target.closest('.delete')) return
    if (ToDoList.classList.contains('active')) {
        if (!e.target.closest('.todo')) {
            ToDoList.classList.remove('active')
        }
    }
})
window.addEventListener('load', getLocalStorage)
CREATE_BTN.addEventListener('click', createList)
OPEN_BTN.addEventListener('click', () => {
    ToDoList.classList.toggle('active')
})

