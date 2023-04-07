import Header from "../../lib/Header/header.js";
import ShowDataCaseficio from "../../lib/show-data-caseficio/show-data-caseficio.js";
import { dataCaseficio ,cheeseInputData} from "../../helpers/helper.js";

const wrapper = {
    header: document.querySelector('section.header-component'),
    showDataCaseficio: document.querySelector('section.show-data-caseficio'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();

const showDataCaseficio = new ShowDataCaseficio(wrapper.showDataCaseficio,dataCaseficio.list);
showDataCaseficio.init();
console.log(showDataCaseficio);

const logo = document.querySelector('.logo');
console.log(logo);
logo.addEventListener('click', e => {
    window.location = "../index.html";
})

const loginBtn = document.querySelector('.log-in-section>a');
const forma = document.querySelector('.forma-section>a');
forma.setAttribute("href", "../forma-page/index.html");
loginBtn.setAttribute("href", "../login-page/index.html");