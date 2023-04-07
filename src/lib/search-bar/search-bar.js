class SearchBar {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;

        this.template;
        
        this.listFileds = [];
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            inputComponent: this.template.querySelector('.search'),
            submitBtn: this.template.querySelector('.find')
        }
        
        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
        this.elements.submitBtn.addEventListener('click', (e) => this.handlerApply(e));
    }

    handlerApply() {
        this.parentElement.dispatchEvent(new CustomEvent('search-caseficio', {
            bubbles: true,
        },
        ));
    }
    initTemplate() {
        const parser = new DOMParser();
        const templateString =`
        <div class="search-bar-wrapper">
            <div class="search-bar">
                <input class="search" placeholder="Cerca caseficio">
                <div class="search-divide-line"></div>
                <button class="find"><h4>Cerca</h4></button>
            </div>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }
}

export default SearchBar;
