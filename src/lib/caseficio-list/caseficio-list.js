class CaseficioList {
    constructor(parent, propsCaseficio, propsForma) {
        this.parentElement = parent;
        this.propsCaseficio = propsCaseficio;
        this.propsForma = propsForma;

        this.template;

        this.fieldStrings = [];
    }

    init() {
        let isProps = this.propsCaseficio ? true : false;

        if (isProps) {
            this.initElements();
            this.initEventListeners();
        }
    }

    initElements() {
        this.template = this.initTemplate();

        this.parentElement.appendChild(this.template);
    }

    destroy() {
        this.parentElement.removeChild(this.template);

        this.template = null;
    }

    initEventListeners() {

    }

    initTemplate() {
        const parser = new DOMParser();
        let templateString = '';
        if (propsForma) {
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

        console.log(this.propsCaseficio);

        let fieldString = '';
        this.propsCaseficio.forEach(element => {
            console.log(element);
            if (propsForma) {
                fieldString += `
                <div class="row-data" uidCaseficio="${element.uid}">
                  <div class="cell">${element.nome}</div>
                  <div class="divide-line-list-casefici"></div>
                  <div class="cell">${element.provincia}</div>
                  </div>`;
            } else {
                fieldString += `
          <div class="row-data" uidCaseficio="${element.uid}">
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
