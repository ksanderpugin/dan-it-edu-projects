import {Visit} from "./visit.js";
import {createElement} from "./create_element.js";

export class VisitCardiologist extends Visit {

    constructor({pressure, wi, previous, age, ...all}) {
        super(all);
        this.pressure = pressure;
        this.wi = wi;
        this.previous = previous;
        this.age = age;
    }

    createNode() {
        const node = super.createNode();
        node.querySelector('.visit-card__info').append(
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Звичайний тиск:</span>${this.pressure}`}),
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Індекс маси тіла:</span>${this.wi}`}),
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Перенесені захворювання серцево-судинної системи:</span>${this.previous}`}),
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Вік:</span>${this.age}`})
        );
        return node;
    }

    getCardTitle() {
        return 'Візит до кардіолога';
    }
}