import Header from "../../lib/Header/header.js";
import CaseficioList from "../../lib/caseficio-list/caseficio-list.js";
import UtilFetch from "../../utils/util-fetch.js";
import { sellForma } from "../../helpers/helper.js";
import { getCookieValue } from "../../utils/util-cookie.js";
import DataCaseficio from "../../lib/data-caseficio/data-caseficio.js";

const wrapper = {
    header: document.querySelector('section.header-component'),
    showDataCaseficio: document.querySelector('section.show-data-caseficio'),
    contentwrapperProvinciaList: document.querySelector('.list-wrapper'),
    contentwrapperFormaSell: document.querySelector('.forma-wrapper'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();

const form = document.querySelector('form');
form.setAttribute('onsubmit', 'event.preventDefault();');


const logo = document.querySelector('.logo');
console.log(logo);
logo.addEventListener('click', e => {
    window.location = "../index.html";
})

const loginBtn = document.querySelector('.log-in-section>a');
loginBtn.setAttribute("href", "../login-page/index.html");


let listCasefici = [];


await UtilFetch.postData('../../utils/php/getCaseficioNameProvincia.php', {})
    .then(fetchResponse => {
        console.log("ok");
        const { status, data } = fetchResponse;
        if (status >= 200 && status < 300) {
            console.log(data);
            data.forEach(element => {
                listCasefici.push(element);
            });
            console.log("ok");
            console.log(status);
        } else {
            console.log("Problems");
            console.log(data);
            console.log(status);
        }
    });

console.log(listCasefici);
let dataCaseficio;

wrapper.contentwrapperProvinciaList.addEventListener('apply-forma-caseficio', async e => {
    console.log("Funcziona");
    console.log(e);

    let formaData = [];

    const forma = {
        uidForma: getCookieValue("SelectedCaseficioForma")
    }
    console.log(forma);
    await UtilFetch.postData('../../utils/php/getFormaByUid.php', forma)
        .then(fetchResponse => {
            console.log("ok");
            const { status, data } = fetchResponse;
            if (status >= 200 && status < 300) {
                console.log(data);
                data.forEach(element => {
                    formaData.push(element);
                })
                console.log("ok");
                console.log(status);
            } else {
                console.log("Problems");
                console.log(data);
                console.log(status);
            }
        });

    console.log(formaData);
    let id;
    let idScelta;
    let idStagionatura;
    let codiceCaseficio;
    let codiceUnivoco;
    let idAcquirente;
    let uidCaseficio;

    formaData.forEach(element => {
        sellForma.list.forEach(test => {
            if (test.title === "Formaggio pronto ") {
                test.value = formaData.length;
            }
        })
        id = element.id;
        idScelta = element.idScelta;
        idStagionatura = element.idStagionatura;
        codiceCaseficio = element.codiceCaseficio;
        codiceUnivoco = element.codiceUnivoco;
        idAcquirente = element.idAcquirente;
        uidCaseficio = element.uidCaseficio;
    })

    const formaDataProps = [{
        id: formaData.length,
        idScelta: idScelta,
        idStagionatura: idStagionatura,
        codiceCaseficio: codiceCaseficio,
        codiceUnivoco: codiceUnivoco,
        idAcquirente: idAcquirente,
        uidCaseficio: uidCaseficio,
    }]
    console.log(sellForma.list);
    console.log(formaDataProps);

    if (dataCaseficio) {
        // delete the old instance
        dataCaseficio.destroy();
    }

    // create a new instance
    dataCaseficio = new DataCaseficio(wrapper.contentwrapperFormaSell, false, false, sellForma.list);
    dataCaseficio.init();
})
const caseficioList = new CaseficioList(wrapper.contentwrapperProvinciaList, listCasefici, true);
caseficioList.init();