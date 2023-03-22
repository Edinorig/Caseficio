class Field {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.elements = {};

    }

    init() {
        this.initElements();
        this.initEventListeners();
    }


    initElements() {
        this.template = this.initTemplate();

        this.elements = {

        };

        this.initAttributes();
    }

    initEventListeners() {

    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
            <div class="wrapper-container-field">
                ${this.initEntry()}
            </div>
        `;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initEntry() {
 
    }


    initSelect() {
    }

    initAttributes() {  
        
     }
    
}




export default Field;
