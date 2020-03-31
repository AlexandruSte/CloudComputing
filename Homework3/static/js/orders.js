window.onload = function () {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            makeTable(this.responseText);
        }
    };
    xhttp.open("GET", "getComenzi", true);
    xhttp.send();
}

function makeTable(data) {
    data = JSON.parse(data);
    let table = document.getElementById("ordersTable");
    for (let key in data) {
        let cmd = data[key];
        let x = document.createElement("tr");
        let id = document.createElement("td");
        let comanda = document.createElement("td");
        let magazine = document.createElement("td");
        let status = document.createElement("td");
        let action = document.createElement("td");
        let btnAction = document.createElement("button");
        id.innerText = cmd["email"];
        comanda.innerText = cmd["comanda"];
        magazine.innerText = cmd["magazine"];
        status.innerText = cmd["status"] ? "In Curs de livrare" : "Nelivrat";
        if (cmd["status"] === 0) {
            action.append(btnAction);
            btnAction.textContent = "Work on this";
            console.log(cmd);
            btnAction.addEventListener("click", function () {
                makePost(cmd);
            });
        }
        x.append(id);
        x.append(comanda);
        x.append(magazine);
        x.append(status);
        x.append(action);
        table.append(x);
    }
}

function makePost(data) {
    console.log(data);
    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            location.reload();
        }
    };
    xhttp2.open("POST", "work", true);
    xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp2.send(JSON.stringify(data));
}