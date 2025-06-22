import {User} from "./user.js";
import {VisitCardiologist} from "./visit_cardiologist.js";
import {VisitDentist} from "./visit_dentist.js";
import {VisitTherapist} from "./visit_therapist.js";

export class VisitList {
    #list;

    constructor() {
        this.#list = [];
        this.#loadVisits()
            .then(data => {
                data.forEach(visit => {
                    switch (visit.doctor) {
                        case 'cardiologist':
                            this.#list.push(new VisitCardiologist(visit));
                            break;

                        case 'dentist':
                            this.#list.push(new VisitDentist(visit));
                            break;

                        case 'therapist':
                        default:
                            this.#list.push(new VisitTherapist(visit));
                            break;
                    }
                });
                this.render({});
            });
    }

    add(visit) {
        this.#list.push(visit);
        this.render({});
    }

    render({search = '', state = 'all', urgency = 'all'}) {
        let visits = this.#list;
        if (search) visits = visits.filter(visit => visit.title.toLowerCase().includes(search.toLowerCase()) || visit.description.toLowerCase().includes(search.toLowerCase()));
        if (state !== 'all') visits = visits.filter(visit => visit.done === state.includes('done'));
        if (urgency !== 'all') visits = visits.filter(visit => visit.urgency === urgency);
        const nodes = visits.map(visit => visit.getNode());
        const f = document.createDocumentFragment();
        nodes.forEach(node => f.append(node));
        const list = document.querySelector('.visit-list');
        list.innerHTML = '';
        list.append(f);
    }

    getVisitById(id) {
        return this.#list.find(visit => visit.id === id);
    }

    remove(visit) {
        const index = this.#list.indexOf(visit);
        if (index !== -1) {
            this.#list.splice(index, 1);
        }
    }

    async #loadVisits() {
        const response = await fetch(
            'https://ajax.test-danit.com/api/v2/cards',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${User.token}`
                }
            }
        );
        return await response.json();
    }

}