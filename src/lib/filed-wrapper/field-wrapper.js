import { createOptions } from "../../utils/util-select.js";

class Field {
    constructor(parent, props, propName) {
        this.parentElement = parent;
        this.props = props;
        this.propName = propName;
        this.template;
        this.elements = {};

        this.isValid = props.value !== '';
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
        const { dataEntry } = this.elements;


        dataEntry.addEventListener('input', () => {

            const isValid = this.props.validate(dataEntry.value);

            console.log(isValid);

            dataEntry.classList.toggle('data-wrong', !isValid);
            dataEntry.classList.toggle('data-valid', isValid);

            this.isValid = isValid;

            this.props.value = dataEntry.value;

        });
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
            <div class="wrapper-container-field ${this.propName}">
                ${this.initEntry()}
            </div>
        `;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initEntry() {
        const { title, className, placeHolder, identificator, hideDisplay, inputType, value, required } = this.props;

        if (inputType === 'text' || inputType === 'number' || inputType === 'tel' || inputType === 'email' || inputType === 'date' || inputType === 'pass') {
            return `
                <div class="wrapper-data  ${hideDisplay} ">
                    <div class="name-input  ${identificator}">${title}</div>
                    <input class="data-entry ${className}  ${identificator}" value="${value ? value : ''}" ${(required) ? required : ''} type="${inputType}">
                </div>
            `;
        }
        if (inputType === 'selector') {
            return `
            <div class="wrapper-data  ${hideDisplay}">
                <div class="name-input data-entry  ${identificator}"> ${title} </div>
                ${this.initSelect()}
            </div>
        `;
        }

    }


    initSelect() {
        return `
        <select class="${this.props.className} " ${this.props.required} required>
            ${createOptions(this.props.value, this.props.option)}
        </select>
        `
    }

    initAttributes() {
        const { maxLenght, inputType, key, value, minLength, className, placeHolder } = this.props;
        const { dataEntry } = this.elements;

        /*         if (placeHolder !== undefined) {
                    dataEntry.setAttribute('placeholder', placeHolder);
                }
        
                if (minLength !== undefined) {
                    dataEntry.setAttribute('minlength', minLength);
                }
        
                if (maxLenght !== undefined) {
                    dataEntry.setAttribute('maxlength', maxLenght);
                } */
    }
}






export default Field;
