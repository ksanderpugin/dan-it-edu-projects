import {Visit} from "./visit.js";
import {createElement} from "./create_element.js";

export class VisitDentist extends Visit {

    constructor({lastDate, ...all}) {
        super(all);
        this.lastDate = lastDate;
    }

    createNode() {
        const node = super.createNode();
        node.querySelector('.visit-card__info').append(
            createElement({tagName: 'p', classList: ['visit-card__info-item'], html: `<span>Дата останнього відвідування:</span>${this.lastDateUA}`})
        );
        node.querySelector('.visit-card__title').style.backgroundColor = '#ffcccc';
        return node;
    }

    get lastDateUA() {
        const date = new Date(this.lastDate);
        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    }

    getCardTitle() {
        return 'Візит до стоматолога';
    }
}