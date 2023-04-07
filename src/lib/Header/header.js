import { getCookieValue, createCookie } from "../../utils/util-cookie.js";
import { setIdInUrl } from "../../utils/util-urls.js";

class Header {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;

        this.template;
        this.elements = {};
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    destroy() {
    }

    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            headerLogin: this.template.querySelector('.log-in-section'),
            headerLogout: this.template.querySelector('.log-out-section'),
            headerInputData: this.template.querySelector('.input-data-section'),
            headerInputDataLink: this.template.querySelector('.nav-bar-name-input-data'),
            headerInputDataSelected: this.template.querySelector('.input-data-section>div.selected-section'),
            headerStatistica: this.template.querySelector('.statistica-section'),
            headerStatisticaSelected: this.template.querySelector('.statistica-section>div.selected-section'),
            headerForma: this.template.querySelector('.forma-section'),
            headerFormaSelected: this.template.querySelector('.forma-section>div.selected-section'),
            headerCasefici: this.template.querySelector('.casefici-section'),
            headerCaseficiSelected: this.template.querySelector('.casefici-section>div.selected-section'),
        }

        this.parentElement.appendChild(this.template);

        const userIdx = getCookieValue("idx");
        const permission = getCookieValue("User");
        
        setIdInUrl("idx",userIdx)
        
        if (permission === 'Caseficio') {
            this.elements.headerLogin.classList.toggle('display-none', true);
            this.elements.headerLogout.classList.toggle('display-none', false);
            this.elements.headerInputData.classList.toggle('display-none', false);

            this.elements.headerInputDataLink.setAttribute("href", "../routes/manage-data-caseficio/index.html");
        }

        if (permission === 'Consorzio') {
            this.elements.headerForma.classList.toggle('display-none', false);
            this.elements.headerLogin.classList.toggle('display-none', true);
            this.elements.headerLogout.classList.toggle('display-none', false);
            this.elements.headerStatistica.classList.toggle('display-none', false);
            this.elements.headerCasefici.classList.toggle('display-none', false);
        }

        if (permission === 'null') {
            
        }

    }

    initEventListeners() {
        this.elements.headerLogout.addEventListener('click', e => {
            createCookie('User', 'User')
        })
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `<header>
            <div class="logo">
                <h2>Rifugio di formaggi</h2>
            </div>
            <div class="nav-bar">
                <div class="log-in-section">
                    <a  href="./login-page/index.html">
                        <h3>Login</h3>
                    </a>
                </div>
                <div class="log-out-section display-none">
                    <a  class="nav-bar-name-logout "  href="../index.html">
                        <h3>Logout</h3>
                    </a>
                </div>
                <div class="input-data-section display-none">
                    <a class="nav-bar-name-input-data " >
                        <h3>Input data</h3>
                    </a>
                    <div class="selected-section display-none"></div>
                </div>
                <div class="statistica-section display-none">
                    <a class="nav-bar-name "  href="">
                        <h3>Statistica</h3>
                    </a>
                    <div class="selected-section display-none"></div>
                </div>
                <div class="forma-section display-none">
                    <a class="nav-bar-name "  href="./forma-page/index.html">
                        <h3>Forma</h3>
                    </a>
                    <div class="selected-section display-none"></div>
                </div>
                <div class="casefici-section display-none">
                    <a class="nav-bar-name "  href="">
                        <h3>New Caseficio</h3>
                    </a>
                    <div class="selected-section display-none"></div>
                </div>
            </div>
        </header>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > header");
    }
}

export default Header;