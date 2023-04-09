import Field from "../filed-wrapper/field-wrapper.js";

class ShowDataCaseficio {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;

        this.template;

        this.fieldStrings = [];
    }

    init() {
        this.initElements();
        this.initEventListeners();
        this.initField();
    }

    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            inputComponent: this.template.querySelector('.show-data-caseficio'),
        }

        this.parentElement.appendChild(this.template);
    }


    initEventListeners() {

    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="main-content">
            <div class="show-data-caseficio">
            </div>

        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initField() {
                this.props.forEach(props => {
            const fieldWrapper = new Field(this.elements.inputComponent, props)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.inputComponent.appendChild(el);
        });
    }

}


export default ShowDataCaseficio;
