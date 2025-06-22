import { createElement } from "./create_element.js";
import { NotificationCenter } from "./notification_center.js";

export class Modal {
    #authNode;
    #visitNode;

    constructor() {
        this.#createAuthNode();
        this.#createVisitNode();
    }

    showAuth(callback) {
        this.#show(this.#authNode);
        this.#authNode.querySelector('form').onsubmit = (e) => {
            e.preventDefault();
            const email = e.target.elements.email.value.trim();
            if (!/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email)) {
                e.target.elements.email.focus();
                NotificationCenter.add('Введіть коректний E-mail', NotificationCenter.TYPE.ERROR);
                return;
            }
            const pass = e.target.elements.password.value;
            if (pass.length < 1) {
                e.target.elements.password.focus();
                e.target.elements.password.placeholder = 'Введіть пароль';
                return;
            }
            if (typeof callback === 'function') callback({email: email, password: pass});
        }
    }

    showVisit(callback, visit = null) {
        if (visit) {
            this.#fillVisitForm(visit);
            this.#visitNode.querySelector('.modal__title > span').textContent = 'Редагування картки';
        } else {
            this.#visitNode.querySelector('.modal__title > span').textContent = 'Створити візит';
        }
        this.#show(this.#visitNode);
        this.#visitNode.querySelector('form').onsubmit = (e) => {
            e.preventDefault();
            const doctor = e.target.elements.doctor.value;
            if (doctor === 'select') return;
            const data = {doctor: doctor};
            document.querySelectorAll(`.modal__form-item--all, .modal__form-item--${doctor}`).forEach(el => {
                const input = el.querySelector('input, textarea, select');
                data[this.#defToCamelCase(input.name)] = input.value;
            });
            if (typeof callback === 'function') callback(data);
        }
    }

    hideAuth() {
        this.#hide(this.#authNode);
    }

    hideVisit() {
        this.#hide(this.#visitNode);
    }

    #show(node) {
        node.style.opacity = '0';
        document.body.append(node);
        setTimeout((element) => {
            element.style.opacity = '1';
        }, 100, node);
    }

    #hide(node) {
        node.style.opacity = '0';
        setTimeout( (element) => {
            element.remove();
            this.#clear(node);
        }, 600, node);
    }

    #clear(node) {
        if (node === this.#visitNode) {
            node.querySelectorAll('input, textarea').forEach(el => {el.value = ''});
            node.querySelector('[name="doctor"]').value = 'select';
            node.querySelector('[name="urgency"]').value = 'normal';
            node.querySelectorAll('p.modal__form-item, button.modal__form-button').forEach(el => {el.style.display = 'none'});
        } else {
            node.querySelectorAll('input').forEach(el => {el.value = ''});
        }
    }

    #fillVisitForm(visit) {
        const form = this.#visitNode.querySelector('form');
        form.elements.doctor.value = visit.doctor;
        form.elements.doctor.dispatchEvent(new Event('change'));

        form.elements.title.value = visit.title ?? '';
        form.elements.description.value = visit.description ?? '';
        form.elements.urgency.value = visit.urgency ?? 'normal';
        form.elements.name.value = visit.name ?? '';
        form.elements.pressure.value = visit.pressure ?? '';
        form.elements.wi.value = visit.wi ?? '';
        form.elements.previous.value = visit.previous ?? '';
        form.elements.age.value = visit.age ?? '';
        form.elements['last-date'].value = visit.lastDate ?? '';
    }

    #createAuthNode() {
        this.#authNode = createElement({tagName: 'div', classList: ['modal-wrapper']});
        const divModal = createElement({tagName: 'div', classList: ['modal']});

        // title
        const title = createElement({tagName: 'h2', classList: ['modal__title'], text: 'Авторизація'});
        const close = createElement({tagName: 'button', classList: ['modal__close-btn']});
        title.append(close);
        divModal.append(title);

        // auth form
        const formWrapper = createElement({tagName: 'div', classList: ['modal__form']});
        const form = createElement({tagName: 'form', attrs: {action: '#'}});
        const mailLabel = createElement({tagName: 'span', classList: ['modal__form-label'], text: 'Email:'});
        const mailInput = createElement({tagName: 'input', classList: ['modal__form-input'], attrs: {type: 'email', name: 'email', required: 'required', autocomplete: 'autocomplete'}});
        const passLabel = createElement({tagName: 'span', classList: ['modal__form-label'], text: 'Пароль:'});
        const passInput = createElement({tagName: 'input', classList: ['modal__form-input'], attrs: {type: 'password', name: 'password', required: 'required'}});
        const button = createElement({tagName: 'button', classList: ['modal__form-button'], text: 'Продовжити'});
        form.append(mailLabel, mailInput, passLabel, passInput, button);
        formWrapper.append(form);
        divModal.append(formWrapper);

        this.#authNode.append(divModal);

        // setting close button
        this.#authNode.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__close-btn') || e.target.classList.contains('modal-wrapper')) {
                this.#hide(this.#authNode);
            }
        });
    }

    #createVisitNode() {
        this.#visitNode = createElement({tagName: 'div', classList: ['modal-wrapper']});
        const modalBody = createElement({tagName: 'div', classList: ['modal']});

        // add title
        const title = createElement({tagName: 'h2', classList: ['modal__title']});
        const span = createElement({tagName: 'span', text: 'Створити візит'});
        const close = createElement({tagName: 'button', classList: ['modal__close-btn']});
        title.append(span, close);
        modalBody.append(title);

        // add form
        const formWrapper = createElement({tagName: 'div', classList: ['modal__form']});
        const form = createElement({tagName: 'form', attrs: {action: '#'}});
        // select TAG for choosing doctor
        const selectDoctor = createElement({tagName: 'select', classList: ['modal__form-select'], attrs: {name: 'doctor'}});
        selectDoctor.append(
            createElement({tagName: 'option', text: 'Оберіть лікаря', attrs: {value: 'select'}}),
            createElement({tagName: 'option', text: 'Кардіолог', attrs: {value: 'cardiologist'}}),
            createElement({tagName: 'option', text: 'Стоматолог', attrs: {value: 'dentist'}}),
            createElement({tagName: 'option', text: 'Терапевт', attrs: {value: 'therapist'}})
        );
        // target of visit field
        const targetField = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--all'], css: {display: 'none'}});
        targetField.append(
            createElement({tagName: 'span', text: 'Мета візиту', classList: ['modal__form-label']}),
            createElement({tagName: 'input', classList: ['modal__form-input'], attrs: {type: 'text', name: 'title'}})
        );
        // description field
        const description = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--all'], css: {display: 'none'}});
        description.append(
            createElement({tagName: 'span', text: 'Опис візиту', classList: ['modal__form-label']}),
            createElement({tagName: 'textarea', classList: ['modal__form-textarea'], attrs: {name: 'description', rows: 4}})
        );
        // select urgency
        const urgency = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--all'], css: {display: 'none'}});
        const urgencySelect = createElement({tagName: 'select', classList: ['modal__form-select'], attrs: {name: 'urgency'}});
        urgencySelect.append(
            createElement({tagName: 'option', text: 'звичайна', attrs: {value: 'normal'}}),
            createElement({tagName: 'option', text: 'пріоритетна', attrs: {value: 'priority'}}),
            createElement({tagName: 'option', text: 'невідкладна', attrs: {value: 'high'}})
        );
        urgency.append(
            createElement({tagName: 'span', text: 'Терміновість', classList: ['modal__form-label']}),
            urgencySelect
        );
        // full name field
        const fullName = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--all'], css: {display: 'none'}});
        fullName.append(
            createElement({tagName: 'span', text: 'ПІБ', classList: ['modal__form-label']}),
            createElement({tagName: 'input', classList: ['modal__form-input'], attrs: {type: 'text', name: 'name', autocomplete: 'autocomplete'}})
        );
        // pressure field
        const pressure = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--cardiologist'], css: {display: 'none'}});
        pressure.append(
            createElement({tagName: 'span', text: 'Звичайний тиск', classList: ['modal__form-label']}),
            createElement({tagName: 'input', classList: ['modal__form-input'], attrs: {type: 'number', name: 'pressure', min: '50', max: '160'}})
        );
        // weight index field
        const wi = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--cardiologist'], css: {display: 'none'}});
        wi.append(
            createElement({tagName: 'span', text: 'Індекс маси тіла', classList: ['modal__form-label']}),
            createElement({tagName: 'input', classList: ['modal__form-input'], attrs: {type: 'number', name: 'wi', step: '0.01', min: '10', max: '60'}})
        );
        // previous cardiovascular diseases field
        const previous = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--cardiologist'], css: {display: 'none'}});
        previous.append(
            createElement({tagName: 'span', text: 'Перенесені захворювання серцево-судинної системи', classList: ['modal__form-label']}),
            createElement({tagName: 'textarea', classList: ['modal__form-textarea'], attrs: {type: 'text', name: 'previous', rows: 3}})
        );
        // age field
        const age = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--cardiologist', 'modal__form-item--therapist'], css: {display: 'none'}});
        age.append(
            createElement({tagName: 'span', text: 'Вік', classList: ['modal__form-label']}),
            createElement({tagName: 'input', classList: ['modal__form-input'], attrs: {type: 'number', name: 'age', min: '0', max: '120'}})
        );
        // last date field
        const lastDate = createElement({tagName: 'p', classList: ['modal__form-item', 'modal__form-item--dentist'], css: {display: 'none'}});
        lastDate.append(
            createElement({tagName: 'span', text: 'дата останнього відвідування', classList: ['modal__form-label']}),
            createElement({tagName: 'input', classList: ['modal__form-input'], attrs: {type: 'date', name: 'last-date'}})
        );

        // continue button
        const button = createElement({tagName: 'button', classList: ['modal__form-button'], text: 'Продовжити', css: {display: 'none'}});

        // add items to form body
        form.append(selectDoctor, targetField, description, urgency, fullName, pressure, wi, previous, age, lastDate, button);
        formWrapper.append(form);
        modalBody.append(formWrapper);
        this.#visitNode.append(modalBody);

        // settings select Doctor
        selectDoctor.addEventListener('change', (e) => {
            this.#visitNode.querySelectorAll('p').forEach(el => {
                el.style.display = 'none';
                const input = el.querySelector('input, textarea');
                if (input) input.required = false;
            });
            switch (e.target.value) {

                case 'cardiologist':
                    this.#visitNode.querySelectorAll('.modal__form-item--cardiologist, .modal__form-item--all').forEach(this.#showFieldsAndSetRequired);
                    this.#visitNode.querySelector('.modal__form-button').style.display = 'block';
                    break;

                case 'dentist':
                    this.#visitNode.querySelectorAll('.modal__form-item--dentist, .modal__form-item--all').forEach(this.#showFieldsAndSetRequired);
                    this.#visitNode.querySelector('.modal__form-button').style.display = 'block';
                    break;

                case 'therapist':
                    this.#visitNode.querySelectorAll('.modal__form-item--therapist, .modal__form-item--all').forEach(this.#showFieldsAndSetRequired);
                    this.#visitNode.querySelector('.modal__form-button').style.display = 'block';
                    break;

                default:
                    this.#visitNode.querySelector('.modal__form-button').style.display = 'none';
                    break;
            }
        });

        // setting close button
        this.#visitNode.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__close-btn') || e.target.classList.contains('modal-wrapper')) {
                this.#hide(this.#visitNode);
            }
        });
    }

    #showFieldsAndSetRequired(el) {
        el.style.display = 'block';
        const input = el.querySelector('input, textarea');
        if (input) input.required = true;
    }

    #defToCamelCase(str) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
}