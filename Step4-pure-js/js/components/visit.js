import {User} from "./user.js";
import {createElement} from "./create_element.js";

export class Visit {
    #node;

    constructor({id = 0, title, description, urgency, name, doctor, done = false}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.urgency = urgency;
        this.name = name;
        this.doctor = doctor;
        this.done = done;
    }

    save() {
        return new Promise((resolve, reject) => {
            const data = {}
            for (const key in this) {
                if (this.hasOwnProperty(key)) {
                    data[key] = this[key];
                }
            }
            if (this.id > 0) {
                this.#sendRequest('PUT', `${Visit.#apiUrl}/${this.id}`, data)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                this.#sendRequest('POST', `${Visit.#apiUrl}`, data)
                    .then(response => response.json())
                    .then(data => {
                        this.id = data.id;
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        })

    }

    delete() {
        return new Promise((resolve, reject) => {
            this.#sendRequest('DELETE', `${Visit.#apiUrl}/${this.id}`, {})
                .then(response => response.status)
                .then(status => {
                    if (status === 200) {
                        resolve(true);
                        this.#node.remove();
                        this.#node = null;
                    }
                    else reject('Error delete. Status: ' + status);
                })
                .catch(error => {
                    reject('ERROR delete visit' + error);
                });
        });

    }

    getNode() {
        if (!this.#node) this.#node = this.createNode();
        return this.#node;
    }

    createNode() {
        const node = createElement({tagName: 'div', classList: ['visit-card-wrapper']});
        const card = createElement({tagName: 'div', classList: ['visit-card'], dataset: {id: this.id}});
        const title = createElement({tagName: 'h2', classList: ['visit-card__title'], text: this.getCardTitle(), dataset: {done: String(!!this.done)}});
        const name = createElement({tagName: 'p', classList: ['visit-card__name'], text: this.name});

        const info = createElement({tagName: 'div', classList: ['visit-card__info'], dataset: {show: 'false'}});
        info.append(
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Title:</span>${this.title}`}),
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Description:</span>${this.description}`}),
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Urgency:</span>${this.urgencyStr}`}),
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Name:</span>${this.name}`}),
        );

        const actions = createElement({tagName: 'div', classList: ['visit-card__actions']});
        const moreButton = createElement({tagName: 'button', classList: ['visit-card__actions-button', 'visit-card__actions-button--more']});
        const doneButton = createElement({tagName: 'button', classList: ['visit-card__actions-button', 'visit-card__actions-button--done']});
        const editButton = createElement({tagName: 'button', classList: ['visit-card__actions-button', 'visit-card__actions-button--edit']});
        const deleteButton = createElement({tagName: 'button', classList: ['visit-card__actions-button', 'visit-card__actions-button--delete']});

        moreButton.addEventListener('click', (e) => {
            const info = e.target.parentElement.previousElementSibling;
            const show = info.dataset.show === 'true';
            if (!show) info.style.height = info.scrollHeight + 'px';
            else info.style.height = '0px';
            info.dataset.show = String(!show);
        })

        if (this.done) actions.append(moreButton, deleteButton);
        else actions.append(moreButton, doneButton, editButton, deleteButton);
        card.append(title, name, info, actions);
        node.append(card);
        return node;
    }

    get urgencyStr() {
        const words = {
            normal: 'ordinary',
            priority: 'priority',
            high: 'urgent'
        }
        return words[this.urgency];
    }

    getCardTitle() {
        return 'Visit to ...';
    }

    static #apiUrl = 'https://ajax.test-danit.com/api/v2/cards';

    #sendRequest(method, url, data) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${User.token}`
            },
            body: JSON.stringify(data)
        });
    }
}