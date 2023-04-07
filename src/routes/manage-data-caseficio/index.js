import Header from "../../lib/Header/header.js";
import DataCaseficio from "../../lib/data-caseficio/data-caseficio.js";
import { milkInputData, cheeseInputData } from "../../helpers/helper.js";
import UtilFetch from "../../utils/util-fetch.js";
import { getCookieValue, createCookie } from "../../utils/util-cookie.js";

const wrapper = {
    header: document.querySelector('section.header-component'),
    mainContent: document.querySelector('#container'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();

const dataCaseficio = new DataCaseficio(wrapper.mainContent, milkInputData.list, cheeseInputData.list);
dataCaseficio.init();

const logo = document.querySelector('.logo');
logo.addEventListener('click', e => {
    window.location = "../index.html";
})

const form = document.querySelector('form');
form.setAttribute('onsubmit', 'event.preventDefault();');

wrapper.mainContent.addEventListener('apply-insert-data', (e) => handlerApply(e));

const handlerApply = async (e) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');

    const currentDatetime = `${yyyy}-${mm}-${dd}`;
    const fiedsList = wrapper.mainContent.querySelectorAll('.data-entry');
    const uidCaseficio = getCookieValue('UidCaseficio');

    let milkValidation = [];
    dataCaseficio.propsMilk.forEach(element => {
        if (element.value !== '') {
            milkValidation.push(true)
        } else {
            milkValidation.push(false);
            fiedsList.forEach(filed => {
                if (filed.classList.contains('data-wrong') && filed.value === null) {
                    filed.classList.toggle('data-wrong', true);
                } else if (!(filed.classList.contains('data-wrong')) && !(filed.classList.contains('data-valid')) && !(filed.classList.contains('data-output')) && !(filed.classList.contains('optional'))) {
                    filed.classList.toggle('data-wrong', true);
                }
            });
        }
    });
    console.log(milkValidation);
    console.log(dataCaseficio.propsMilk);

    let cheeseValidation = [];
    dataCaseficio.propsCheese.forEach(element => {
        if (element.value !== '') {
            cheeseValidation.push(true);
        } else {
            cheeseValidation.push(false);
            fiedsList.forEach(filed => {
                if (filed.classList.contains('data-wrong') && filed.value === null) {
                    filed.classList.toggle('data-wrong', true);
                } else if (!(filed.classList.contains('data-wrong')) && !(filed.classList.contains('data-valid')) && !(filed.classList.contains('data-output')) && !(filed.classList.contains('optional'))) {
                    filed.classList.toggle('data-wrong', true);
                }
            });
        }
    });

    console.log(dataCaseficio.propsCheese);

    console.log(cheeseValidation);

    if (checkBooleanArray(milkValidation)) {
        console.log(milkValidation);


        const latteUsata = dataCaseficio.propsMilk[0].value;
        const latteLavorata = dataCaseficio.propsMilk[1].value;

        // const {
        //     0: { value: latteUsata, },
        //     1: { value: latteLavorata, },
        // } = dataCaseficio.propsMilk;

        const milkData = {
            latteUsato: latteUsata,
            latteRaccolto: latteLavorata,
            dataRaccolta: currentDatetime,
            uidCaseficio: uidCaseficio
        }

        console.log(milkData);
        await UtilFetch.postData('../../utils/php/insertMilk.php', milkData)
            .then(fetchResponse => {
                console.log("ok");
                const { status, data } = fetchResponse;
                if (status >= 200 && status < 300) {
                    console.log(data);
                    console.log("ok");
                    console.log(status);
                } else {
                    console.log("Problems");
                    console.log(data);
                    console.log(status);
                }
            });

        console.log("ok");

    } else if (checkBooleanArray(cheeseValidation)) {
        console.log("Cheese is ready");

        const quantita = dataCaseficio.propsCheese[0].value;
        const staggionatura = dataCaseficio.propsCheese[1].value;
        const scelta = dataCaseficio.propsCheese[2].value;


        let number = [];

        let progressiveNumverTemp = getCookieValue("ProgressiveNumber");

        let codiceCaseficioTemp = getCookieValue("CodiceCaseficio");


        for (let index = 0; index < quantita; index++) {
            let progressiveNumver = getCookieValue("ProgressiveNumber");
            let codiceCaseficio = getCookieValue("CodiceCaseficio");
            let codice = codiceCaseficio + "/" + currentDatetime;
            let codiceUnivoco = codiceCaseficio + "/" + currentDatetime + "/" + progressiveNumver;

            let cheeseData = {
                quantita: quantita,
                staggionatura: staggionatura,
                scelta: scelta,
                uidCaseficio: uidCaseficio,
                currentData: currentDatetime,
                codiceUnivoco: codiceUnivoco,
                idAcquirente: null,
                codiceCaseficio: codiceCaseficio
            }

            number.push(progressiveNumver)


            console.log(cheeseData);
            await UtilFetch.postData('../../utils/php/insertCheese.php', cheeseData)
                .then(fetchResponse => {
                    console.log("ok");
                    const { status, data } = fetchResponse;
                    if (status >= 200 && status < 300) {
                        console.log(data);
                        console.log("ok");
                        console.log(status);
                    } else {
                        console.log("Problems");
                        console.log(data);
                        console.log(status);
                    }
                });

            progressiveNumver++;

            createCookie("ProgressiveNumber", progressiveNumver)
        }

        const parser = new DOMParser();
        const showCodice = document.querySelector('.wrapper-manage-data');
        const showDataT = document.querySelectorAll('.wrapper-container-show-data');
        const templateString = `
            <div class="wrapper-container-field wrapper-container-show-data">        
                <div class="wrapper-data   ">
                    <div class="name-input  cheese-elements">Codice</div>
                    <input class="data-entry show-data  cheese-elements data-valid"  readonly>
                </div>
            </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        let temp = templateElement.documentElement.querySelector(".wrapper-container-field");

        // Check if the child element already exists in the parent element before appending it

        console.log(showDataT);

        showDataT.forEach(el=>{
            console.log(el);
            showCodice.removeChild(el)
        })

        showCodice.appendChild(temp);
        console.log(number);

        const [min, max] = findMinMax(number);
        let codiceTemp = codiceCaseficioTemp + "/" + currentDatetime + "/" + "(" + min + "-" + max + ")";
        console.log(min);
        console.log(max);

        let showData = document.querySelector('.show-data');
        showData.value = codiceTemp;


    }
};

const inputdataBtn = document.querySelector('.nav-bar-name-input-data');
const logOutBtn = document.querySelector('.nav-bar-name-logout');
const selectedInputBtn = document.querySelector('.input-data-section>div.selected-section');

inputdataBtn.removeAttribute("href");
logOutBtn.setAttribute("href", "../index.html");
selectedInputBtn.classList.toggle('display-none', false)

inputdataBtn.addEventListener('click', e => {
    console.log("Clicked");
})


function checkBooleanArray(boolArray) {
    let allTrue = true;

    boolArray.forEach(boolValue => {
        if (boolValue === false) {
            allTrue = false;
        }
    });
    return allTrue;
}

function findMinMax(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        // handle invalid input
        return undefined;
    }

    let min = numbers[0];
    let max = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        } else if (numbers[i] > max) {
            max = numbers[i];
        }
    }

    return [min, max];
}


