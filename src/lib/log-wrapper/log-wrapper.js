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
            submitBtn: this.template.querySelector('.submit-btn')
        }
        
        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
        this.elements.submitBtn.addEventListener('click', (e) => this.handlerApply(e));
    }

    handlerApply() {
        this.parentElement.dispatchEvent(new CustomEvent('apply-login-data', {
            bubbles: true,
        },
        ));
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

    isValid() {
        const isValidArray = [];


        this.listFileds.forEach(filed => {
            console.log(filed);
            isValidArray.push(filed.isValid);
        });
        return isValidArray;
    }
}

export default LogWrapper;
