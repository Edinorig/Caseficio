import Field from "../filed-wrapper/field-wrapper.js";

class LogWrapper {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;

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
            inputComponent: this.template.querySelector('.input-wrapper'),
        }
        

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString =`
        <div class="main-content">
            <div class="logo">
                <h1>Login</h1>
            </div>
            <div class="input-wrapper">

            </div>
            <button class="submit-btn"><h3>Submit</h3></button>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initField(){
        this.props.forEach(props => {
            const fieldWrapper = new Field (this.elements.inputComponent, props)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.inputComponent.appendChild(el);
            this.listFileds.push(fieldWrapper);
        }); 
    }
}

export default LogWrapper;
