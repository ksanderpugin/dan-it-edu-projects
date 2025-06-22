import {Visit} from "./visit.js";
import {createElement} from "./create_element.js";

export class VisitTherapist extends Visit {

    constructor({age, ...all}) {
        super(all);
        this.age = age;
    }

    createNode() {
        const node = super.createNode();
        node.querySelector('.visit-card__info').append(
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Вік:</span>${this.age}`})
        );
        node.querySelector('.visit-card__title').style.backgroundColor = '#ccffcc';
        return node;
    }

    getCardTitle() {
        return 'Візит до терапевта';
    }
}