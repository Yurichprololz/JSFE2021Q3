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

CREATE_BTN.addEventListener('click', createList)
OPEN_BTN.addEventListener('click', () => {
    ToDoList.classList.toggle('active')
})