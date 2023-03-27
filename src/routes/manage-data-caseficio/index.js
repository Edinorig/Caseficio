import Header from "../../lib/Header/header.js";
import DataCaseficio from "../../lib/data-caseficio/data-caseficio.js";
import {milkInputData,cheeseInputData} from "../../helpers/helper.js"; 

const wrapper = {
    header: document.querySelector('section.header-component'),
    mainContent: document.querySelector('#container'),
};

/* function setCookies(permission, userId) {
    // Set permission cookie to expire in 30 days
    const permissionExpires = new Date(Date.now() + 30 * 24 * 60 * 60);
    document.cookie = `permission=${permission};expires=${permissionExpires.toUTCString()};path=/`;
  
    // Set user ID cookie to expire in 365 days
    const userExpires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `userId=${userId};expires=${userExpires.toUTCString()};path=/`;
  }

  setCookies("User","1") */

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();

const dataCaseficio = new DataCaseficio (wrapper.mainContent, milkInputData.list,cheeseInputData.list);
dataCaseficio.init();

wrapper.mainContent.addEventListener('apply-insert-data', (e) => handlerApply(e));

const handlerApply = (e) => {
    console.log("great succes");
    console.table(dataCaseficio.isValid());
};

localStorage.setItem('permision','Denys');
console.log(localStorage.getItem('permision'));