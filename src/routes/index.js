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
    } else {
    createCookie("User", "null");
}

const header = new Header(wrapper.header, props.header);
header.init();

const logOut = document.querySelector('.nav-bar-name-logout ');
logOut.setAttribute("href","./index.html")

const userPermission = getCookieValue("User");

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
                                    } else {
                                                        }
            });

        // destroy the existing caseficioList if it exists
        if (caseficioList) {
            caseficioList.destroy();
            caseficioList = null;
        }

        if (dataStatus != 0) {
            caseficioList = new CaseficioList(wrapper.caseficioList, dataStatus);
            caseficioList.init();
        }

        const row = document.querySelectorAll('.row-data');
    
        row.forEach(element => {
            element.addEventListener('click', e => {
                                if (caseficioList) {
                    caseficioList.destroy();
                    caseficioList = null;
                }
                                let temp = element.getAttribute("uidcaseficio");
                                setIdInUrl("uidcaseficio",temp);
                createCookie("SelectedCaseficio", temp);
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
        await UtilFetch.postData('../utils/php/getCaseficioData.php', uidUser)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;
            if (status >= 200 && status < 300) {
                                data.forEach(element => {
                    uidCaseficio = element.uid;
                    codiceCaseficio = element.codiceCaseficio;
                });
            } else {
                                            }
        });

    createCookie("UidCaseficio", uidCaseficio);
    createCookie("CodiceCaseficio", codiceCaseficio);
    createCookie("ProgressiveNumber", 0);
}

