import UtilFetch from "../utils/util-fetch.js"
import { getCookieValue } from "../utils/util-cookie.js";

async function getStaggionaturaType() {
    const stagginatturaTypes = [];

    await UtilFetch.postData('../../utils/php/getStaggionaturaType.php', {})
        .then(fetchResponse => {
            const { status, data } = fetchResponse;
            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    stagginatturaTypes.push(props.mese);
                });

            } else {

                console.error(fetchResponse);
            }
        });

    console.log(stagginatturaTypes);

    return stagginatturaTypes;
}

async function getAcquirenteType() {
    const acquirenteType = [];

    await UtilFetch.postData('../../utils/php/getAcquirenteType.php', {})
        .then(fetchResponse => {
            const { status, data } = fetchResponse;
            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    acquirenteType.push(props.tipo);
                });

            } else {

                console.error(fetchResponse);
            }
        });

    console.log(acquirenteType);

    return acquirenteType;
}

async function getCaseficioData() {
    const dataCaseficio = [];

    const uidUser = {
        uidUser: getCookieValue("SelectedCaseficio"),
    }

    await UtilFetch.postData('../../utils/php/getCaseficioData.php', uidUser)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;
            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    dataCaseficio.cap = props.cap;
                    dataCaseficio.citta = props.citta;
                    dataCaseficio.codiceCaseficio = props.codiceCaseficio;
                    dataCaseficio.latitudine = props.latitudine;
                    dataCaseficio.longitudine = props.longitudine;
                    dataCaseficio.nome = props.nome;
                    dataCaseficio.nomeTitolare = props.nomeTitolare;
                    dataCaseficio.numCivico = props.numCivico;
                    dataCaseficio.provincia = props.provincia;
                    dataCaseficio.via = props.via;
                    console.log(dataCaseficio.via);
                });
                console.log(data);
                console.log(status);

            } else {
                console.log(data);
                console.log(status);
                console.error(fetchResponse);
            }
        });

    console.log(dataCaseficio);

    return dataCaseficio;
}

console.log(getCaseficioData());



async function getSceltaType() {
    const getSceltaType = [];

    await UtilFetch.postData('../../utils/php/getSceltaType.php', {})
        .then(fetchResponse => {
            const { status, data } = fetchResponse;
            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    getSceltaType.push(props.scelta);
                });

            } else {

                console.error(fetchResponse);
            }
        });

    console.log(getSceltaType);

    return getSceltaType;
}

const getCap = array => {
    return array.cap
}
const getCitta = array => {
    return array.citta
}
const getCodiceCaseficio = array => {
    return array.codiceCaseficio
}

console.log(getCodiceCaseficio(await getCaseficioData()));
const getLatitudine = array => {
    return array.latitudine
}
const getLongitudine = array => {
    return array.longitudine
}
const getNome = array => {
    return array.nome
}
const getNomeTitolare = array => {
    return array.nomeTitolare
}
const getNumCivico = array => {
    return array.numCivico
}
const getProvincia = array => {
    return array.provincia
}
const getVia = array => {
    return array.via
}


const loginInput = {
    name: '',
    list: [
        {
            title: '',
            inputType: 'text',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            placeHolder: 'login',
            validate: (value) => { return true },
        },
        {
            title: '',
            inputType: 'pass',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            placeHolder: 'pass',
            validate: (value) => { return true },
        }
    ]
}

const sellForma = {
    name: '',
    list: [
        {
            title: 'Formaggio pronto ',
            inputType: 'text',
            value: '',
            maxLenght: '',
            required: 'readonly',
            className: 'show-data data-entry',
            placeHolder: 'login',
            validate: (value) => { return true },
        },
        {
            title: 'Formaggio scelta',
            inputType: 'selector',
            value: '',
            option: await getSceltaType(),
            maxLenght: '',
            required: 'required',
            className: 'input-data-select data-entry',
            placeHolder: '',
            validate: (value) => { return true },
        },
        {
            title: 'Formaggio da vendere',
            inputType: 'text',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data data-entry',
            placeHolder: 'pass',
            validate: (value) => { return true },
        },
        {
            title: 'Acquirente',
            inputType: 'text',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data data-entry',
            placeHolder: 'pass',
            validate: (value) => { return true },
        },
        {
            title: 'Tipo acquirente',
            placeHolder: 'pass',
            validate: (value) => { return true },
            inputType: 'selector',
            value: '',
            option: await getAcquirenteType(),
            maxLenght: '',
            required: 'required',
            className: 'input-data-select data-entry',
        }
    ]
}


const milkInputData = {
    name: 'Milk',
    list: [
        {
            title: 'Latte estratta',
            inputType: 'number',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            identificator: 'milk-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => validateNumber(value),
        },
        {
            title: 'Latte lavorato',
            inputType: 'number',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data ',
            identificator: 'milk-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => validateNumber(value),
        }
    ]
}

const cheeseInputData = {
    name: 'Cheese',
    list: [
        {
            title: 'Quantita',
            inputType: 'number',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => validateNumber(value),
        },
        {
            title: 'Staggionatura',
            inputType: 'selector',
            value: '',
            option: await getStaggionaturaType(),
            maxLenght: '',
            required: 'required',
            className: 'input-data-select data-entry',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => { return validateSelect(value) },
        },
        {
            title: 'Scelta',
            inputType: 'selector',
            value: '',
            option: await getSceltaType(),
            maxLenght: '',
            required: 'required',
            className: 'input-data-select data-entry',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => { return validateSelect(value) },
        }
    ]
}

const dataCaseficio = {
    name: '',
    list: [
        {
            title: 'Nome',
            inputType: 'text',
            value: getNome(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: 'login',
            validate: (value) => { return true },
        },
        {
            title: 'NomeTitolare',
            inputType: 'text',
            value: getNomeTitolare(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: '',
            validate: (value) => { return true },
        }, {
            validate: (value) => { return true },
            title: 'Via',
            inputType: 'text',
            value: getVia(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: '',
        },
        {
            title: 'NumCivico',
            inputType: 'text',
            value: getNumCivico(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: '',
            validate: (value) => { return true },
        }
        ,
        {
            title: 'Cap',
            inputType: 'text',
            value: getCap(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: '',
            validate: (value) => { return true },
        },
        {
            title: 'Citta',
            inputType: 'text',
            value: getCitta(await getCaseficioData()),
            maxLenght: '',
            required: 'required',
            className: 'show-data',
            placeHolder: '',
            validate: (value) => { return true },
        },
        {
            title: 'Longitudine',
            inputType: 'text',
            value: getLongitudine(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: '',
            validate: (value) => { return true },
        },
        {
            title: 'Latitudine',
            inputType: 'text',
            value: getLatitudine(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: '',
            validate: (value) => { return true },
        },
        {
            title: 'Provincia ',
            inputType: 'text',
            value: getProvincia(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: '',
            validate: (value) => { return true },
        },
        {
            title: 'CodiceCaseficio ',
            inputType: 'text',
            value: getCodiceCaseficio(await getCaseficioData()),
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            placeHolder: '',
            validate: (value) => { return true },
        },
        // {
        //     title: 'caseficioid ',
        //     inputType: 'text',
        //     value: await getStaggionaturaType(),
        //     maxLenght: '',
        //     required: 'required',
        //     className: 'show-data',
        //     placeHolder: '',
        //     validate: (value) => { return true },
        // }
    ]
}




const validateText = (text) => {
    const textToValidate = text.toString().replace(/^\s+/, '');

    if (textToValidate.length === 0) {
        return false;
    }

    if (/[^a-zA-Z\s]/.test(textToValidate)) {
        return false;
    }

    return true;
}

function validateNumber(input) {
    return /^[0-9]+$/.test(input);
}

const validateSelect = selectElement => {
    if (selectElement.selectedIndex === 0) {
        return false;
    }

    return true;
};


export { loginInput, cheeseInputData, milkInputData, dataCaseficio,sellForma }