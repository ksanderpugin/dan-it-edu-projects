export function createElement(obj) {
    const element = document.createElement(obj.tagName);
    if (obj.text) element.textContent = obj.text;
    if (obj.html) element.innerHTML = obj.html;
    if (obj.classList) element.classList.add(...obj.classList);
    if (obj.css) {
        for (const style in obj.css) {
            element.style[style] = obj.css[style];
        }
    }
    if (obj.attrs) {
        for (const attr in obj.attrs) {
            element.setAttribute(attr, obj.attrs[attr]);
        }
    }
    if (obj.dataset) {
        for (const dataItem in obj.dataset) {
            element.dataset[dataItem] = obj.dataset[dataItem];
        }
    }
    return element;
}