import Field from "../filed-wrapper/field-wrapper.js";
class DataCaseficio {
    constructor(parent, props,propsCheese) {
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

    destroy() {
    }

    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            inputComponent: this.template.querySelector('.wrapper-manage-data'),
            milkSection: this.template.querySelector('#milk'),
            cheeseSection: this.template.querySelector('#cheese'),
        }


        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
        this.elements.cheeseSection.addEventListener('click',e=>{
            console.log("Success");
            this.initFieldCheese();
        })
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="main-content">
            <div class="nav-bar-input-data">
                <div class="name-section" >
                    <H3 id="milk">Latte</H3>
                    <div class="selected-section"></div>
                </div>
                <div class="name-section">
                    <H3 id="cheese">Formaggio</H3>
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
