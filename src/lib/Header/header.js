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

        console.log(this.template);

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString =`<header>
            <div class="logo">
                <h2>Rifugio di formaggi</h2>
            </div>
            <div class="nav-bar">
                <a class="nav-bar-name" href="./login-page/index.html">
                    <h3>Login</h3>
                </a>
                <a class="nav-bar-name" href="">
                    <h3>Input data</h3>
                </a>
                <a class="nav-bar-name" href="">
                    <h3>Statistica</h3>
                </a>
                <a class="nav-bar-name" href="">
                    <h3>Forma</h3>
                </a>
                <a class="nav-bar-name" href="">
                <h3>Casefici</h3>
            </a>
            </div>
        </header>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > header");
    }
}

export default Header;