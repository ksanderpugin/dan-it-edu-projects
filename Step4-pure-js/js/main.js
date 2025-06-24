import { User, Modal, NotificationCenter, VisitCardiologist, VisitDentist, VisitTherapist, VisitList } from "./components";

const modal = new Modal();
const user = new User();
let list = user.isAuth ? new VisitList() : null;

const loginButton = document.querySelector('.header-button--login');
const addButton = document.querySelector('.header-button--add');

loginButton.hidden = user.isAuth;
addButton.hidden = !user.isAuth;

const createVisitByData = (data) => {
    let visit = null;
    switch (data.doctor) {
        case 'cardiologist':
            visit = new VisitCardiologist(data);
            break;

        case 'dentist':
            visit = new VisitDentist(data);
            break;

        case 'therapist':
            visit = new VisitTherapist(data);
            break;
    }
    return visit;
}

loginButton.addEventListener('click', () => {
    modal.showAuth( async (formData) => {
        try {
            await user.auth(formData.email, formData.password);
            loginButton.hidden = true;
            addButton.hidden = false;
            modal.hideAuth();
            list = new VisitList();
        } catch (error) {
            if (error.code === 0) {
                NotificationCenter.add('Internet connection error', NotificationCenter.TYPE.ERROR);
            } else if (error.code === 401) {
                NotificationCenter.add('Incorrect email or password', NotificationCenter.TYPE.ERROR);
            } else {
                NotificationCenter.add('Authorization error. Contact your administrator.', NotificationCenter.TYPE.ERROR);
                console.error(`User auth error: ${error}`);
            }
        }
    });
});

addButton.addEventListener('click', () => {
    modal.showVisit( (data) => {
        let visit = createVisitByData(data);
        if (visit) {
            visit.save()
                .then(() => {
                    modal.hideVisit();
                    list.add(visit);
                    document.querySelector('.search-form').reset();
                })
                .catch(error => {
                    console.error('ERROR save visit', error);
                });
        }
    });
});

document.querySelector('.search-form').onsubmit = (e) => {
    e.preventDefault();
    const searchData = {};
    Array.from(e.target.elements).forEach( el => {
        if (el.name) searchData[el.name] = el.value;
    });
    list.render(searchData);
}

// Edit and delete card
document.addEventListener('click', (e) => {
    
    // Edit card
    if (e.target.classList.contains('visit-card__actions-button--edit')) {
        let visit = list.getVisitById(+e.target.closest('.visit-card').dataset.id);
        modal.showVisit( (data) => {
            const id = visit.id;
            visit = createVisitByData(data);
            visit.id = id;
            visit.save()
                .then(() => {
                    modal.hideVisit();
                    document.querySelector(`.visit-card[data-id="${id}"]`).parentElement.replaceWith(visit.getNode());
                })
                .catch(error => {
                    console.error('ERROR save visit', error);
                });
        }, visit);
    }
    
    // Delete card
    if (e.target.classList.contains('visit-card__actions-button--delete')) {
        const confirmation = confirm('Delete entry?');
        if (!confirmation) return;
        const visit = list.getVisitById(+e.target.closest('.visit-card').dataset.id);
        visit.delete().then(() => {
            list.remove(visit);
        });
    }

    // Set done
    if (e.target.classList.contains('visit-card__actions-button--done')) {
        const confirmation = confirm('End the visit? Editing is not possible after completion!');
        if (!confirmation) return;
        const visit = list.getVisitById(+e.target.closest('.visit-card').dataset.id);
        visit.done = true;
        visit.save().then(() => {
            const card = document.querySelector(`.visit-card[data-id="${visit.id}"]`);
            card.querySelector('.visit-card__title').dataset.done = 'true';
            card.querySelector('.visit-card__actions-button--done').remove();
            card.querySelector('.visit-card__actions-button--edit').remove();
        });
    }
})

// Drag and Drop
let ddGo = false;
let ddElement = null;
let ddMouseStartX = 0;
let ddMouseStartY = 0;
let ddElementStartX = 0;
let ddElementStartY = 0;
document.addEventListener('mousedown', (e) => {
    if (e.ctrlKey || e.buttons !== 1) return;
    if (e.target.classList.contains('visit-card__title')) {
        ddGo = true;
        ddElement = e.target.closest('.visit-card');
        ddMouseStartX = e.clientX;
        ddMouseStartY = e.clientY;
        ddElementStartX = ddElement.getBoundingClientRect().left;
        ddElementStartY = ddElement.getBoundingClientRect().top;
    }
});
document.addEventListener('mouseup', (e) => {
    if (e.target.classList.contains('visit-card__title')) ddGo = false;
});
document.addEventListener('mousemove', (e) => {
    if (ddGo) {
        const dx = e.clientX - ddMouseStartX;
        const dy = e.clientY - ddMouseStartY;
        ddElement.style.position = 'absolute';
        ddElement.style.left = `${ddElementStartX + dx}px`;
        ddElement.style.top = `${ddElementStartY + dy}px`;
    }
});