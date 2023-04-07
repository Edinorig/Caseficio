import { loginInput } from "../../helpers/helper.js";
import LogWrapper from "../../lib/log-wrapper/log-wrapper.js";
import UtilFetch from "../../utils/util-fetch.js";
import { createCookie } from "../../utils/util-cookie.js";
import { setIdInUrl } from "../../utils/util-urls.js";

const wrapper = {
    component: document.querySelector('form.component'),
};

const props = {
    component: {},
};




const logWrapper = new LogWrapper(wrapper.component, loginInput.list);
console.log(logWrapper.props);

logWrapper.init();


const fiedsList = wrapper.component.querySelectorAll('.data-entry');

const form = document.querySelector('form');
form.setAttribute('onsubmit', 'event.preventDefault();');

wrapper.component.addEventListener('apply-login-data', (e) => handlerApply(e));

const handlerApply = async (e) => {
    const {
        0: { value: userLogin, },
        1: { value: userPass, },
    } = logWrapper.props;

    const logData = {
        userLogin,
        userPass
    }

    if (checkBooleanArray(logWrapper.isValid())) {
        console.log("success");
        console.log(logData);

        let userPermission;
        let userId;
        let uid;

        await UtilFetch.postData('../../utils/php/getUserPermission.php', logData)
            .then(fetchResponse => {
                const { status, data } = fetchResponse;
                if (status >= 200 && status < 300) {
                    data.forEach(element => {
                        userId = element.id;
                        uid = element.uid;
                        if (element.permissionCaseficio !== null) {
                            userPermission = "Caseficio";
                        }
                        else if (element.permissionConsorzio !== null) {
                            userPermission = "Consorzio";
                        } else {
                            userPermission = "User";
                        }
                    });
                } else {
                }
            });

        if (userPermission === undefined) {
            console.log(fiedsList);
            fiedsList.forEach(filed => {
            console.log(fiedsList);
            filed.classList.remove('data-valid', true);
            filed.classList.add('data-wrong', true);
        });
        } else {
            console.log(userPermission);
            createCookie("User", userPermission);
            createCookie("UidUser", uid);
            createCookie("idx",userId);
            setIdInUrl("idx",userId);
            window.location.href = "../index.html";
        }
    } else {
        fiedsList.forEach(filed => {
            if (filed.classList.contains('data-wrong') && filed.value === null) {
                filed.classList.toggle('data-wrong', true);
            } else if (!(filed.classList.contains('data-wrong')) && !(filed.classList.contains('data-valid')) && !(filed.classList.contains('data-output')) && !(filed.classList.contains('optional'))) {
                filed.classList.toggle('data-wrong', true);
            }
        });
    }
}

function checkBooleanArray(boolArray) {
    let allTrue = true;

    boolArray.forEach(boolValue => {
        if (boolValue === false) {
            allTrue = false;
        }
    });
    return allTrue;
}