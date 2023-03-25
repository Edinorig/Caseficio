import Field from "../filed-wrapper/field-wrapper.js";
class DataCaseficio {
    constructor(parent, props, propsCheese) {
        this.parentElement = parent;
        this.props = props;
        this.propsCheese = propsCheese;

        this.template;

        this.listFileds = [];
    }

    init() {
        this.initElements();
        this.initEventListeners();
        this.initField();
    }

    deleteFields() {
        const elements = document.querySelectorAll(`.wrapper-container-field`);
        elements.forEach(element => {
            element.remove();
        });
    }

    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            inputComponent: this.template.querySelector('.wrapper-manage-data'),
            milkSection: this.template.querySelector('#milk'),
            cheeseSection: this.template.querySelector('#cheese'),
            selectedSection: this.template.querySelector('.selected-section'),
            milkSelectedSection: this.template.querySelector('#milk>div.selected-section'),
            cheeseSelectedSection: this.template.querySelector('#cheese>div.selected-section'),
        }


        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
        this.elements.selectedSection.classList.toggle('display-none', false);

        this.elements.cheeseSection.addEventListener('click', e => {
            this.deleteFields();
            this.initFieldCheese();

            this.elements.milkSelectedSection.classList.toggle('display-none', true);
            this.elements.cheeseSelectedSection.classList.toggle('display-none', false);
        })
        this.elements.milkSection.addEventListener('click', () => {
            this.deleteFields();
            this.initField();

            this.elements.milkSelectedSection.classList.toggle('display-none', false);
            this.elements.cheeseSelectedSection.classList.toggle('display-none', true);
        });
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="main-content">
            <div class="nav-bar-input-data">
                <div class="name-section" id="milk">
                    <H3>Latte</H3>
                    <div class="selected-section"> </div>
                </div>
                <div class="name-section" id="cheese">
                    <H3 >Formaggio</H3>
                    <div class="selected-section display-none"></div>
                </div>
            </div>
            <div class="wrapper-manage-data">

            </div>
            <div class="wrapper-btns">
                <button class="cancel-btn">
                    <h3 class="cancel-txt">Cancel</h3>
                </button>
                <button class="submit-btn">
                    <h3 >Submit</h3>
                </button>
            </div> 
        </div> `;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initField() {
        this.props.forEach(props => {
            const fieldWrapper = new Field(this.elements.inputComponent, props)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.inputComponent.appendChild(el);
            this.listFileds.push(fieldWrapper);
        });
    }
    initFieldCheese() {
        this.propsCheese.forEach(props => {
            const fieldWrapper = new Field(this.elements.inputComponent, props)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.inputComponent.appendChild(el);
            this.listFileds.push(fieldWrapper);
        });
    }
}

export default DataCaseficio;
