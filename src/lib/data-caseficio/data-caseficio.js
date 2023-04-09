import Field from "../filed-wrapper/field-wrapper.js";
class DataCaseficio {
    constructor(parent, propsMilk, propsCheese, propsForma) {
        this.parentElement = parent;
        this.propsMilk = propsMilk;
        this.propsCheese = propsCheese;
        this.propsForma = propsForma;

        this.template;

        this.listFileds = [];
        this.listCheeseFields = [];
    }

    init() {
        this.initElements();
        this.initEventListeners();
        if (!(this.propsMilk === false)) {
            this.initField();
        }
        if (this.propsForma !== undefined) {
            this.initFieldForma();   
        }
    }



    deleteFields() {
        const elements = document.querySelectorAll(`.wrapper-container-field`);
        elements.forEach(element => {
            element.remove();
        });
    }

    destroy() {
        // // Remove all event listeners
        // if (this.elements.cheeseSection) {
        //   this.elements.cheeseSection.removeEventListener('click', this.handleCheeseClick);
        // }
        // if (this.elements.milkSection) {
        //   this.elements.milkSection.removeEventListener('click', this.handleMilkClick);
        // }
        this.elements.submitBtn.removeEventListener('click', this.handleApplyClick);

        console.log(this.template);
    
        // Remove the template element from the parent element
        this.parentElement.removeChild(this.template);
    
        // Clear the list of fields
        this.listFileds = [];
        this.listCheeseFields = [];
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
            submitBtn: this.template.querySelector('.submit-btn'),
        }

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
        if (this.elements.selectedSection) {
            this.elements.selectedSection.classList.toggle('display-none', false);
        }

        if (this.elements.cheeseSection) {

            this.elements.cheeseSection.addEventListener('click', e => {
                this.deleteFields();
                this.initFieldCheese();

                this.listFileds = [];

                this.propsMilk.forEach(e => {
                    e.value = '';
                })

                this.elements.milkSelectedSection.classList.toggle('display-none', true);
                this.elements.cheeseSelectedSection.classList.toggle('display-none', false);
            })
        }
        if (this.elements.milkSection) {
            this.elements.milkSection.addEventListener('click', () => {
                this.deleteFields();
                this.initField();

                this.listCheeseFields = [];

                this.propsCheese.forEach(e => {
                    e.value = '';
                })


                this.elements.milkSelectedSection.classList.toggle('display-none', false);
                this.elements.cheeseSelectedSection.classList.toggle('display-none', true);
            });
        }


        this.elements.submitBtn.addEventListener('click', (e) => this.handlerApply(e));
    }

    handlerApply() {
        this.parentElement.dispatchEvent(new CustomEvent('apply-insert-data', {
            bubbles: true,
        },
        ));
    }

    initTemplate() {
        const parser = new DOMParser();
        let templateString = '';
        
        if (this.propsForma) {
            templateString = `
            <div class="main-content">
                <div class="wrapper-manage-data">
                </div>
                <div class="wrapper-btn">
                    <button class="submit-btn">
                        <h3 >Submit</h3>
                    </button>
                </div> 
            </div> `;

        } else {
            templateString = `
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
        }
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initField() {
        this.propsMilk.forEach(propsMilk => {
            const fieldWrapper = new Field(this.elements.inputComponent, propsMilk)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.inputComponent.appendChild(el);

            this.listFileds.push(fieldWrapper);

        });
    }
    initFieldCheese() {
        this.propsCheese.forEach(propsMilk => {
            const fieldWrapper = new Field(this.elements.inputComponent, propsMilk)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.inputComponent.appendChild(el);

            this.listCheeseFields.push(fieldWrapper);

        });
    }

    initFieldForma() {
        this.propsForma.forEach(propsForma => {
            const fieldWrapper = new Field(this.elements.inputComponent, propsForma)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.inputComponent.appendChild(el);
        });
    }

    isValid() {
        const isValidArray = [];


        this.listFileds.forEach(filed => {
            isValidArray.push(filed.isValid);
        });

        this.listCheeseFields.forEach(field => {
            isValidArray.push(field.isValid);
        });

        return isValidArray;
    }
}

export default DataCaseficio;
