const Trainers = {
    
    data: [],

    sortName: localStorage.getItem('sortName') ?? "default",
    filterDirection: localStorage.getItem('filterDirection') ?? "all",
    filterCategory: localStorage.getItem('filterCategory') ?? "all",
    
    nameIds: {
        "басейн": "swimming pool",
        "тренажерний зал": "gym",
        "дитячий клуб": "kids club",
        "бійцівський клуб": "fight club",
        "майстер": "master",
        "спеціаліст": "specialist",
        "інструктор": "instructor"
    },
    

    renderCards: function(sortOnly = false) {

        // create filtered and sorted data
        const data = this.data.filter(this.filter).sort(this.sort);

        // images array for check load status
        const images = []; 

        // create fragment for trainers cards and fill items
        const fragment = document.createDocumentFragment();
        const trainerCardTemplate = document.getElementById('trainer-card');
        data.forEach( trainerInfo => {
            const cardItem = trainerCardTemplate.content.cloneNode(true);
            cardItem.querySelector('li').dataset.id = trainerInfo.id;
            const img = cardItem.querySelector('img');
            img.src = trainerInfo.photo;
            images.push(img);
            cardItem.querySelector('p').textContent = trainerInfo['last name'] + ' ' + trainerInfo['first name'];
            cardItem.querySelector('button').addEventListener('click', Trainers.showModalTrainerInfo)
            fragment.appendChild(cardItem);
        });

        // set fragment with cards to contenier
        const cardContanier = document.querySelector('.trainers-cards__container');
        cardContanier.innerHTML = null;
        cardContanier.append(fragment);
        if (!sortOnly) Loader.show(images);
    },


    showModalTrainerInfo: function(event) {
        const cardId = +event.target.parentElement.dataset.id;
        const cardInfo = Trainers.data.filter( item => item.id === cardId )[0];
        
        if (cardInfo) {
        
            const modalTemplate = document.getElementById('modal-template');
            const modal = modalTemplate.content.cloneNode(true);
            modal.querySelector('img').src = cardInfo.photo;
            modal.querySelector('.modal__name').textContent = cardInfo['last name'] + ' ' + cardInfo['first name'];
            modal.querySelector('.modal__point--category').textContent = 'Категорія: ' + cardInfo.category;
            modal.querySelector('.modal__point--experience').textContent = 'Досвід: ' + cardInfo.experience;
            modal.querySelector('.modal__point--specialization').textContent = 'Напрям тренера:  ' + cardInfo.specialization;
            modal.querySelector('.modal__text').textContent = cardInfo.description;
        
            modal.querySelector('.modal__close').addEventListener('click', event => {
                event.target.closest('.modal').remove();
                document.body.style.overflow = "auto";
            });
        
            document.body.append(modal);
            document.body.style.overflow = "hidden";
        }
    },


    sort: function(a, b) { // function for Array.sort (sorted cards by selected sorting)
        
        switch (Trainers.sortName.toUpperCase()) {
        
            case 'ЗА ПРІЗВИЩЕМ':
                return a['last name'].localeCompare(b['last name'], 'uk');

            case 'ЗА ДОСВІДОМ':
                return +a.experience.split(' ')[0] < +b.experience.split(' ')[0] ? 1 : -1;

            default:
                return a.id < b.id ? -1 : 1;
        }
    },


    filter: function(cardItem) { // function for Array.filter (filtered cards by category and dirction)
        
        const itemDirection = Trainers.nameIds[cardItem.specialization.toLowerCase()];
        const itemCategory = Trainers.nameIds[cardItem.category.toLowerCase()];
        
        return (Trainers.filterDirection === itemDirection || Trainers.filterDirection === 'all') 
                && 
                (Trainers.filterCategory === itemCategory || Trainers.filterCategory === 'all');
    },


    init: function(data) {

        // Create modify data in Trainers object from DATA
        const newData = [];
        data.forEach( function(elem, index) {
            const item = {};
            Object.assign(item, elem);
            item.id = index+1;
            newData.push(item);
        });
        this.data = newData;
        // -----

        // set active class for sorting button (if sorting save in LS)
        if (Trainers.sortName !== "default") document.querySelectorAll('.sorting__btn').forEach( elem => {
            if (elem.textContent.trim() === Trainers.sortName) elem.classList.add('sorting__btn--active');
            else elem.classList.remove('sorting__btn--active');
        });
        // -----

        // set values for filter form
        const form = document.querySelector('.sidebar__filters.filters');
        form.direction.value = Trainers.filterDirection;
        form.category.value = Trainers.filterCategory;
        // -----

        this.renderCards();

        // show sorting and filter panels
        document.querySelector('.sorting').hidden = false;
        document.querySelector('.sidebar').hidden = false;
        // -----

        // delegate click event from sorting buttons
        document.querySelector('.sorting').addEventListener('click', event => {
            
            if (event.target.classList.contains('sorting__btn--active') || !event.target.classList.contains('sorting__btn')) return;

            document.querySelectorAll('.sorting__btn').forEach( elem => {
                if (elem === event.target) {
                    elem.classList.add('sorting__btn--active');
                    Trainers.sortName = elem.textContent.trim();
                    localStorage.setItem('sortName', Trainers.sortName);
                    Trainers.renderCards(true);
                } else {
                    elem.classList.remove('sorting__btn--active');
                }
            })
        });
        // -----

        // powerOff filter form submit and apply filters
        form.addEventListener('submit', event => {
            event.preventDefault();
            Trainers.filterDirection = event.target.direction.value;
            Trainers.filterCategory = event.target.category.value;
            localStorage.setItem('filterDirection', Trainers.filterDirection);
            localStorage.setItem('filterCategory', Trainers.filterCategory);
            Trainers.renderCards();
        });
        // -----
    }
}


Trainers.init(DATA);