export default function createElement(tag, classList, attributes) {
    const el = document.createElement(`${tag}`)
    if (classList) {
        el.classList = `${classList}`
    }
    if (attributes) {
        for (const key in attributes) {
            el.setAttribute(key, attributes[key])
        }
    }
    return el
}