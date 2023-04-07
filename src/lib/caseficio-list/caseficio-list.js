import Field from "../filed-wrapper/field-wrapper.js";
import { createCookie } from "../../utils/util-cookie.js";

class CaseficioList {
    constructor(parent, props, propsForma) {
        this.parentElement = parent;
        this.props = props;
        this.propsForma = propsForma;

        this.template;

        this.fieldStrings = [];
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.template = this.initTemplate();
       

        this.elements = {
            rowCaseficio: this.template.querySelectorAll('.row-data'),
        }

        this.parentElement.appendChild(this.template);
    }

    destroy() {
        this.parentElement.removeChild(this.template);

        this.template = null;
    }

    initEventListeners() {
        this.elements.rowCaseficio.forEach(element => {
            element.addEventListener('click', (e) => {
                createCookie("SelectedCaseficioForma", element.getAttribute("uidcaseficio"));
                this.handlerApply(e);
            })
        })
    }

    handlerApply() {
        this.parentElement.dispatchEvent(new CustomEvent('apply-forma-caseficio', {
            bubbles: true,
        },
        ));
    }
    initTemplate() {
        const parser = new DOMParser();
        let templateString = '';
        if (this.propsForma) {
            templateString = `
            <div class="table">
                <div class="row header">
                    <div class="cell-header">Nome</div>
                    <div class="divide-line-list-casefici"></div>
                    <div class="cell-header">Provincia</div>
                </div>
                <div class="row-body">
                ${this.initField()}
                </div>
            </div>`;
        } else {
            templateString = `
        <div class="table">
            <div class="row header">
                <div class="cell-header">Nome</div>
                <div class="divide-line-list-casefici"></div>
                <div class="cell-header">Provincia</div>
                <div class="divide-line-list-casefici"></div>
                <div class="cell-header">Nome Titolare</div>
                <div class="divide-line-list-casefici"></div>
                <div class="cell-header">Città</div>
                <div class="divide-line-list-casefici"></div>
                <div class="cell-header">Via</div>
                <div class="divide-line-list-casefici"></div>
                <div class="cell-header">N. Civico</div>
                <div class="divide-line-list-casefici"></div>
                <div class="cell-header">CAP</div>
            </div>
            <div class="row-body">
            ${this.initField()}
            </div>
        </div>`;
        }
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }


    initField() {

        console.log(this.props);

        let fieldString = '';
        this.props.forEach(element => {
            console.log(element);
            if (this.propsForma) {
                fieldString += `
                <div class="row-data" uidcaseficio="${element.uid}">
                  <div class="cell">${element.nome}</div>
                  <div class="divide-line-list-casefici"></div>
                  <div class="cell">${element.provincia}</div>
                  </div>`;
            } else {
                fieldString += `
          <div class="row-data" ="${element.uid}">
            <div class="cell">${element.nome}</div>
            <div class="divide-line-list-casefici"></div>
            <div class="cell">${element.provincia}</div>
            <div class="divide-line-list-casefici"></div>
            <div class="cell">${element.nomeTitolare}</div>
            <div class="divide-line-list-casefici"></div>
            <div class="cell">${element.citta}</div>
            <div class="divide-line-list-casefici"></div>
            <div class="cell">${element.via}</div>
            <div class="divide-line-list-casefici"></div>
            <div class="cell">${element.numCivico}</div>
            <div class="divide-line-list-casefici"></div>
            <div class="cell">${element.cap}</div>
            </div>`;
            }
        });
        return fieldString;
    }

}


export default CaseficioList;
