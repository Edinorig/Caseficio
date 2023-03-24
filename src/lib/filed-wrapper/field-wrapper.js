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
            dataEntry: this.template.querySelector('.data-entry'),
        };

        this.initAttributes();
    }

    render() {
        return this.template;
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

        const { key, title, className, placeHolder, inputType, value, required } = this.props;

        console.log(this.props);

        if (inputType === 'text' || inputType === 'number' || inputType === 'tel' || inputType === 'email' || inputType === 'date' || inputType === 'pass') {
            return `
                <div class="wrapper-data" id="${key}">
                    <input class="data-entry ${className}" value="${value ? value : ''}" ${(required) ? required : ''}>
                </div>
            `;
        }
    }


    initSelect() {
    }

    initAttributes() {
        const { maxLenght, inputType, key, value, minLength, className ,placeHolder} = this.props;
        const { dataEntry } = this.elements;

        console.log(dataEntry);


        if (placeHolder !== undefined) {
            dataEntry.setAttribute('placeholder', placeHolder);
        }

        if (minLength !== undefined) {
            dataEntry.setAttribute('minlength', minLength);
        }

        if (maxLenght !== undefined) {
            dataEntry.setAttribute('maxlength', maxLenght);
        }
    }
}






export default Field;
