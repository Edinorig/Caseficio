import { createOptions } from "../../utils/util-select.js";

class Field {
    constructor(parent, props, propName) {
        this.parentElement = parent;
        this.props = props;
        this.propName = propName;
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
            milkSection: document.querySelector('#milk'),
            milkElements: this.template.querySelector('.milk-elements'),
            cheeseSection: document.querySelector('#cheese'),
            cheeseElements: this.template.querySelectorAll('.cheese-elements'),
        };

        this.initAttributes();
    }

    render() {
        return this.template;
    }

    initEventListeners() {
        console.log(this.elements.milkElements);
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
