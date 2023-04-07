// const storageType = localStorage;
// const consentPropertyType  = 'site-constent';

// const shoudShowPopup = () => !storageType.getItem(consentPropertyType);
// const saveToStorage = () => storageType.setItem(consentPropertyType , true);

// if (shoudShowPopup()) {
//     const consent = confirm('yes');
//     if (consent) {
//         saveToStorage();
//     }

// }

function createCookie(name, value) {
    var minutes = 30; // Set the expiration time to 30 minutes
    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1, cookie.length);
        }
    }
    return null;
}

function checkCookieExists(cookieName) {
    // Split the cookie string into an array of cookies
    var cookies = document.cookie.split(";");

    // Loop through the cookies and check if the cookie name matches the given name
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + "=") == 0) {
            // The cookie exists
            return true;
        }
    }

    // The cookie does not exist
    return false;
}

function resetCookie(cookieName, state) {
    document.cookie = cookieName +"="+ state;
}

export  { createCookie, getCookieValue,checkCookieExists,resetCookie };