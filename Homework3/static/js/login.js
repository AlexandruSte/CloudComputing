function login() {
    location.replace("/login/google");
}

function validateForm() {
    const phone_number = document.forms["myForm"]["phone_number"].value;
    const isNum = /^\d+$/.test(phone_number);
    if (phone_number.length > 10 || phone_number.length < 0 || !isNum) {
        alert("Phone number must be valid.");
        return false;
    }

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/phone?value=" + phone_number, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && this.status === 200) {
            location.replace("/");
        }
    };
    xmlHttp.send(null);
}