import {createElement} from "./create_element.js";

export class NotificationCenter {
    static #node = null;

    static TYPE = {
        INFO: 0,
        WARN: 1,
        ERROR: 2
    }

    static add(message, type = NotificationCenter.TYPE.INFO) {
        if (!NotificationCenter.#node) {
            NotificationCenter.#node = createElement({tagName: 'div', classList: ['notification-center']});
            document.body.append(NotificationCenter.#node);
        }
        const typeClasses = {
            0: 'notification-center__item--info',
            1: 'notification-center__item--warn',
            2: 'notification-center__item--error',
        }
        const item = createElement({tagName: 'p', classList: ['notification-center__item', typeClasses[type]]});
        item.innerHTML = `<span>${message}</span>`;
        NotificationCenter.#node.prepend(item);
        setTimeout( (el) => {
            el.style.opacity = '0';
            setTimeout( (el) => {
                el.remove();
            }, 500, el);
        }, 5000, item);
    }
}