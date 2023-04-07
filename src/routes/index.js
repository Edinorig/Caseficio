import Header from "../lib/Header/header.js";
import { createCookie, checkCookieExists, getCookieValue } from "../utils/util-cookie.js";
import UtilFetch from "../utils/util-fetch.js";
import SearchBar from "../lib/search-bar/search-bar.js";
import CaseficioList from "../lib/caseficio-list/caseficio-list.js";
import { setIdInUrl } from "../utils/util-urls.js";
// import ShowDataCaseficio from "../lib/show-data-caseficio/show-data-caseficio.js";
// import { dataCaseficio } from "../helpers/helper.js";

const wrapper = {
    header: document.querySelector('section.header-component'),
    searchBar: document.querySelector('section.serch-bar-component'),
    caseficioList: document.querySelector('section.caseficio-list'),
    showDataCaseficio: document.querySelector('section.show-data-caseficio'),
};

const props = {
    header: {},
};

if (checkCookieExists('User')) {
    console.log("Function alreade exist");
} else {
    createCookie("User", "null");
}

const header = new Header(wrapper.header, props.header);
header.init();

const logOut = document.querySelector('.nav-bar-name-logout ');
logOut.setAttribute("href","./index.html")

const userPermission = getCookieValue("User");

console.log(userPermission);

if (userPermission === 'Consorzio' || userPermission === 'User'|| userPermission === 'null') {

    const searchBar = new SearchBar(wrapper.searchBar, null);
    searchBar.init();

    wrapper.searchBar.addEventListener('search-caseficio', (e) => handlerApply(e));

    let caseficioList;

    const handlerApply = async (e) => {
        const searchInput = document.querySelector('.search').value;

        const inputData = {
            inputCaseficio: searchInput
        }

        

        let dataStatus;
        await UtilFetch.postData('../utils/php/getCaseficioDataFromSearch.php', inputData)
            .then(fetchResponse => {
                const { status, data } = fetchResponse;
                if (status >= 200 && status < 300) {
                    dataStatus = data;
                    console.log(dataStatus);
                } else {
                    console.log(dataStatus);
                    console.log(data);
                }
            });
        if (dataStatus != 0) {
            caseficioList = new CaseficioList(wrapper.caseficioList, dataStatus);
            caseficioList.init();
        }
        else { // check if instance exists and has destroy method
            caseficioList.destroy(); // call destroy method to remove event listeners and clear DOM elements
            caseficioList = null; // set variable to null to indicate that instance is destroyed
        }

        console.log(caseficioList);


        const row = document.querySelectorAll('.row-data');

    
        row.forEach(element => {
            element.addEventListener('click', e => {
                console.log("Cklicked");
                caseficioList.destroy();
                console.log(e);
                let temp = element.getAttribute("uidcaseficio");
                setIdInUrl("uidcaseficio",temp);
                createCookie("SelectedCaseficio", temp);
                // const showDataCaseficio = new ShowDataCaseficio(wrapper.showDataCaseficio,dataCaseficio.list);
                // showDataCaseficio.init();
                window.location = "./showDataCaseficio/index.html";
            })
        });




    }

}

if (userPermission === 'Caseficio') {
    const uidUser = {
        uidUser: getCookieValue("UidUser")
    }
    let uidCaseficio = '';
    let codiceCaseficio = '';
    console.log(uidUser);
    await UtilFetch.postData('../utils/php/getCaseficioData.php', uidUser)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;
            if (status >= 200 && status < 300) {
                console.log(data);
                data.forEach(element => {
                    uidCaseficio = element.uid;
                    codiceCaseficio = element.codiceCaseficio;
                });
            } else {
                console.log(data);
                console.log(status);
            }
        });

    createCookie("UidCaseficio", uidCaseficio);
    createCookie("CodiceCaseficio", codiceCaseficio);
    createCookie("ProgressiveNumber", 0);
}

