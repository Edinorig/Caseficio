import Header from "../lib/Header/header.js";

const wrapper = {
    header: document.querySelector('section.header-component'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();