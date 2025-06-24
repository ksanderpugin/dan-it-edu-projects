const Loader = {

    loaderWrapper: null,

    init: () => {
        const loaderStyle = document.createElement('link');
        loaderStyle.rel = 'stylesheet';
        loaderStyle.href = './css/loader.css';
        document.head.append(loaderStyle);

        this.loaderWrapper = document.createElement('div');
        this.loaderWrapper.className = 'loader-wrapper';
        this.loaderWrapper.innerHTML = '<div class="loader"></div>';
        document.body.append(this.loaderWrapper);
    },

    show: (checkElements = []) => {
        if (checkElements.length > 0) {
            this.loaderWrapper.style.display = 'flex';
            setTimeout(Loader.checkElementsAndHide, 500, checkElements);
        }
    },

    hide: () => {
        this.loaderWrapper.style.display = 'none';
    },

    checkElementsAndHide: (elements) => {
        for (elem of elements) {
            if (!elem.complete) {
                setTimeout(Loader.checkElementsAndHide, 100, elements);
                return;
            }
        }
        Loader.hide();
    }
}

Loader.init();