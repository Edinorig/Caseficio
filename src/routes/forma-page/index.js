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
    contentwrapperProvinciaRow: document.querySelectorAll('.row-data'),
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
logo.addEventListener('click', e => {
    window.location = "../index.html";
})

const loginBtn = document.querySelector('.log-in-section>a');
loginBtn.setAttribute("href", "../login-page/index.html");


let listCasefici = [];


await UtilFetch.postData('../../utils/php/getCaseficioNameProvincia.php', {})
    .then(fetchResponse => {
        const { status, data } = fetchResponse;
        if (status >= 200 && status < 300) {
            data.forEach(element => {
                listCasefici.push(element);
            });
        } else {
        }
    });

let dataCaseficio;
let dataCaseficioScelta;

let dataCaseficioArray = [];
let formaDataProps = {};
wrapper.contentwrapperProvinciaList.addEventListener('apply-forma-caseficio', async e => {

    let formaData = [];

    const forma = {
        uidForma: getCookieValue("SelectedCaseficioForma")
    }
    await UtilFetch.postData('../../utils/php/getFormaByUid.php', forma)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;
            if (status >= 200 && status < 300) {
                data.forEach(element => {
                    formaData.push(element);
                })
            } else {
            }
        });

    let uidCaseficio;

    if (formaData.length != 0) {
        formaData.forEach(element => {
            sellForma.list.forEach(test => {
                if (test.title === "Formaggio pronto ") {
                    if (formaData.length) {
                        test.value = formaData.length;
                    } else {
                        test.value = 0;
                    }
                }
            })
            uidCaseficio = element.uidCaseficio;
        })
    } else {
        sellForma.list[0].value = '0';
    }

    formaDataProps = {
        uidCaseficio: uidCaseficio,
    }

    dataCaseficioArray.push("1");
    console.log(dataCaseficioArray);

    console.log("Length " + dataCaseficioArray.length);
    // if (dataCaseficioArray.length > 1) {
    //   dataCaseficioArray.shift(); // remove the first element from the array
    //   dataCaseficio.destroy();
    //   console.log("Object deleted");
    // }


    if (dataCaseficio && typeof dataCaseficio.destroy === 'function') {
        dataCaseficio.destroy();
        dataCaseficio = null;
        dataCaseficioArray.shift();
    }
    if (dataCaseficioScelta) {
        dataCaseficioScelta.destroy();
        dataCaseficioScelta = null;
    }


    // create a new instance
    dataCaseficio = new DataCaseficio(wrapper.contentwrapperFormaSell, false, false, sellForma.list);
    dataCaseficio.init();
    console.log(dataCaseficio);

})
console.log("OK");

console.log(sellForma.list);
// dataCaseficio.destroy();
// dataCaseficio = new DataCaseficio(wrapper.contentwrapperFormaSell, false, false, sellForma.list);
// dataCaseficio.init();

wrapper.contentwrapperFormaSell.addEventListener('click', e => {

    const formaggioScelta = document.querySelector('select.see-forma-for-sell');

    console.log(formaggioScelta);

    if (formaggioScelta) {
        formaggioScelta.addEventListener("change", async e => {
            console.log(formaggioScelta);

            const data = {
                identificatorCaseficio: formaDataProps.uidCaseficio,
                sceltaId: formaggioScelta.value,
            }

            console.log(data);
            const test = [];

            await UtilFetch.postData('../../utils/php/getFormaByScelta.php', data)
                .then(fetchResponse => {
                    const { status, data } = fetchResponse;
                    if (status >= 200 && status < 300) {
                        console.log(data);
                        console.log(status);
                        console.log(data.length);
                        test.push(data.length);
                        data.forEach(element=>{
                            test.push(element.idScelta);
                        })
                    } else {

                        console.log(data);
                        console.log(status);
                    }
                });

            console.log(test);

            sellForma.list.forEach(element => {
                console.log(element);
                if (element.title === "Formaggio pronto ") {
                    element.value = test[0].toString();
                    console.log(test);
                    console.log(typeof element.value);
                }
                if (element.title === "Formaggio scelta ") {
                    element.value = test[1].toString();
                    console.log(test);
                    console.log(typeof element.value);
                }
            })

            // check if dataCaseficioScelta already exists and destroy it if it does
            // check if dataCaseficioScelta already exists and destroy it if it does
            if (dataCaseficioScelta) {
                dataCaseficioScelta.destroy();
                dataCaseficioScelta = null;
            }
            if (dataCaseficio) {
                dataCaseficio.destroy();
                dataCaseficio = null;
            }

            // create a new dataCaseficioScelta instance and initialize i
            dataCaseficioScelta = new DataCaseficio(wrapper.contentwrapperFormaSell, false, false, sellForma.list);
            dataCaseficioScelta.init();
            console.log("Created new object");
            console.log(sellForma.list);
            console.log(dataCaseficioScelta);
        });
    }
})

const caseficioList = new CaseficioList(wrapper.contentwrapperProvinciaList, listCasefici, true);
caseficioList.init();
