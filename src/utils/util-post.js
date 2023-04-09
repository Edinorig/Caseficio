import UtilFetch from "./util-fetch.js";

async function getStaggionaturaType() {
    const stagginatturaTypes = [];

    await UtilFetch.postData('../php/getStaggionaturaType.php', {})
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

    
    return stagginatturaTypes;
}

async function getSceltaType() {
    const getSceltaType = [];

    await UtilFetch.postData('../php/getSceltaType.php', {})
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

    
    return getSceltaType;
}

export {getSceltaType ,getStaggionaturaType}