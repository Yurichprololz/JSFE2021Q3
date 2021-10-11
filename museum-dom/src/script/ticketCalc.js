const FORM = document.querySelector('.field__form')
const TEL_FORM = FORM.querySelector('.field__form-lg_phone')
const NAME_FORM = FORM.querySelector('.field__form-lg_name')
const EMAIL_FORM = FORM.querySelector('.field__form-lg_email')
const total = document.querySelector('.tickets-total')
let [b, s] = document.querySelectorAll('.amount-btn')
const basic = b.value
const senior = s.value
let rate = 1
let radio_buttons = document.querySelectorAll('.radio-btn')
const BASIC_FORM = document.getElementById('first_btn')
const SENIOR_FORM = document.getElementById('second_btn')
const BOOK = document.querySelector('.buy')
const mounths = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
radio_buttons.forEach(el => {
    el.addEventListener('click', event => {
        let target = event.target.closest('label')
        rate = Number(target.dataset.rate)
        localStorage.setItem('rate', rate)
        showTotal()
        event.stopPropagation();
    })
})
document.querySelectorAll('.calc').forEach(event => {
    event.addEventListener('click', showTotal)
})

function showTotal() {
    const basic = Number(b.value)
    localStorage.setItem('basic', basic)
    const senior = Number(s.value)
    localStorage.setItem('senior', senior)
    if (localStorage.getItem('rate')) {
        let TOTAL = 'Total € ' + (localStorage.getItem('basic') * 10 + localStorage.getItem('senior') * 20) * localStorage.getItem('rate')
        localStorage.setItem('total', TOTAL)
        total.innerHTML = TOTAL
    } else {
        total.innerHTML = 'Total € ' + (basic * 10 + senior * 20) * rate

    }

}
if (localStorage.getItem('basic')) {
    b.value = localStorage.getItem('basic')
    s.value = localStorage.getItem('senior')
    BASIC_FORM.value = localStorage.getItem('basic')
    SENIOR_FORM.value = localStorage.getItem('senior')

    showTotal()
    switch (localStorage.getItem('rate')) {
        case '1':
            radio_buttons[0].click()
            break;
        case '1.25':
            radio_buttons[1].click()
            break;
        case '2':
            radio_buttons[2].click()
            break;
        default:
            break;
    }
}
const TOTAL_FORM = document.querySelector('.tickets_total_form')
function showPopup() {
    BASIC_FORM.value = localStorage.getItem('basic')
    SENIOR_FORM.value = localStorage.getItem('senior')
    debugger
    if (localStorage.getItem('rate')) {
        let TOTAL = (localStorage.getItem('basic') * 10 + localStorage.getItem('senior') * 20) * localStorage.getItem('rate') + '€'
        localStorage.setItem('total', TOTAL)
        TOTAL_FORM.innerHTML = TOTAL
    } else {
        TOTAL_FORM.innerHTML = (basic * 10 + senior * 20) * rate + '€'

    }

}

////////
BOOK.addEventListener('click', showPopup)


function validName(e) {
    if (!(/^[a-z\sа-я]+$/gi.test(NAME_FORM.value)) || NAME_FORM.value.length < 3 || NAME_FORM.value.length > 15) {
        NAME_FORM.classList.add('red_border')
        FORM.querySelector('.tips_name').textContent = 'Name can contain Cyrillic or Latin letters(3-15)'
    } else {
        if (NAME_FORM.classList.contains('red_border')) {
            NAME_FORM.classList.remove('red_border')
            FORM.querySelector('.tips_name').innerHTML = '&nbsp;'

        }
    }
}
function validMail(e) {
    if (!(/^[a-z0-9\-\_]{3,15}@\w{3,}\.\w{2,}$/gi.test(EMAIL_FORM.value))) {
        EMAIL_FORM.classList.add('red_border')
        FORM.querySelector('.tips_email').textContent = 'Uncorrectly. example is username@example.com'
    } else {
        if (EMAIL_FORM.classList.contains('red_border')) {
            EMAIL_FORM.classList.remove('red_border')
            EMAIL_FORM.querySelector('.tips_email').innerHTML = '&nbsp;'

        }
    }
}
function validPhone(e) {
    if (!(/^\d{2,3}[\-\s]\d{2,3}[\-\s]\d{2,3}([\-\s]\d{2,3})?$/g.test(TEL_FORM.value) || /^\d{3,10}$/g.test(TEL_FORM.value)) || TEL_FORM.value.match(/\d/g).length > 10) {
        TEL_FORM.classList.add('red_border')
        FORM.querySelector('.tips_phone').textContent = "For split use spaces or dashs.can't be more 10 numbers"
    } else {
        if (TEL_FORM.classList.contains('red_border')) {
            TEL_FORM.classList.remove('red_border')
            TEL_FORM.querySelector('.tips_phone').innerHTML = '&nbsp;'

        }
    }
}

TEL_FORM.addEventListener('blur', validPhone)
EMAIL_FORM.addEventListener('blur', validMail)
NAME_FORM.addEventListener('blur', validName)



///////
DATE_FORM = FORM.querySelector('.field__form-sm_left')
function getDate() {
    const date = new Date
    const year = date.getFullYear()
    const mounth = date.getMonth()
    const day = date.getDate()
    return `${year}-${mounth + 1}-${day}`
}
DATE_FORM.min = getDate()
function changeDate() {
    // console.log();
    const date = new Date(DATE_FORM.value)
    const mounth = date.getMonth()
    const dat = date.getDate()
    const day = date.getDay()
    document.getElementById('da').textContent = `${days[day]}, ${mounths[mounth]} ${dat}`

}
DATE_FORM.addEventListener('change', changeDate)

TIME_FORM = FORM.querySelector('.field__form_time')
function changeTime() {
    document.getElementById('time').textContent = TIME_FORM.value
}
TIME_FORM.addEventListener('change', changeTime)