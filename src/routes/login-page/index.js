import { loginInput } from "../../helpers/helper.js";
import Field from "../../lib/filed-wrapper/field-wrapper.js";
import LogWrapper from "../../lib/log-wrapper/log-wrapper.js";

const wrapper = {
    component: document.querySelector('form.component'),
};

const props = {
    component: {},
};

console.log(loginInput.list);

const logWrapper = new LogWrapper(wrapper.component, loginInput.list);
logWrapper.init();