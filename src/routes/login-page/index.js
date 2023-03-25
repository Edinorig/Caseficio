import { loginInput } from "../../helpers/helper.js";
import LogWrapper from "../../lib/log-wrapper/log-wrapper.js";

const wrapper = {
    component: document.querySelector('form.component'),
};

const props = {
    component: {},
};

const logWrapper = new LogWrapper(wrapper.component, loginInput.list);
logWrapper.init();