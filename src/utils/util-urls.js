function setIdInUrl(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    const newUrl = url.toString();
    const stateObj = { path: newUrl };
    history.pushState(stateObj, '', newUrl);
}


export { setIdInUrl }