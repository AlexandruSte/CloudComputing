class PageEditor {
    constructor() {

    }

    clearHome() {
        document.body.removeChild(this.volBtn);
        document.body.removeChild(this.cmnBtn);
        document.getElementById('title').innerText = '';
    }

    getLocation() {
        let lat;
        let long;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                lat = pos.coords.latitude;
                long = pos.coords.longitude;
                this.lat = lat;
                this.long = long;
                document.cookie = 'lat=' + this.lat;
                document.cookie = 'long=' + this.long;
                console.log(this.mail, this.lat + ',' + this.long);
                fetch('https://testezfunction.azurewebsites.net/api/operationOnUser?code=DCI4tJsds3o6ipXcu/DSeYQzxBaWKZJp12gdLlWRLPpYIylG3aeaIg==', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 'insert',
                        mail: this.mail,
                        geol: this.lat + ',' + this.long
                    })
                }).then(data => {

                });
            });
        } else {
            alert('Your browser does not support this feature!');
        }
    }

    clearCommandPage() {
        document.body.removeChild(this.commandBox);
        document.body.removeChild(this.prefBox);
        document.body.removeChild(this.commandLabel);
        document.body.removeChild(this.prefLabel);
        document.body.removeChild(this.placeOrderBtn);
        document.body.removeChild(this.backHome);
    }

    createCommandPage() {
        this.getLocation();
        document.getElementById('title').innerText = 'Place your command';
        this.commandBox = document.createElement('textarea');
        this.prefBox = document.createElement('textarea');
        this.commandLabel = document.createElement('p');
        this.prefLabel = document.createElement('p');
        this.commandLabel.innerText = 'Your shopping list';
        this.prefLabel.innerText = 'Your preffered stores and observations!';
        document.body.appendChild(this.commandLabel);
        document.body.appendChild(this.commandBox);
        this.commandBox.cols = 50;
        this.commandBox.rows = 15;
        document.body.appendChild(this.prefLabel);
        document.body.appendChild(this.prefBox);
        this.prefBox.cols = 50;
        this.prefBox.rows = 15;
        this.placeOrderBtn = document.createElement('button');
        this.placeOrderBtn.textContent = 'Place Order';
        this.placeOrderBtn.style.display = 'block';
        document.body.appendChild(this.placeOrderBtn);
        // getDistance({ 'x': 52.50931, 'y': 13.42936 }, { 'x': 52.50274, 'y': 13.43872 }, (val) => {
        //     console.log('a ' + val);
        //     this.distance = val;
        // });
        this.placeOrderBtn.addEventListener('mousedown', () => {
            let objectToInsert = {
                command: this.commandBox.value,
                prefs: this.prefBox.value,
                userId: this.mail
            };
            console.log(objectToInsert);
            fetch('https://testezfunction.azurewebsites.net/api/addCommand?code=fRozuyvpl79L6N8lHfdR3HAguIzMwnBn7uzWzOfsjcaS6UsKntQsTw==', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objectToInsert)
            });
            alert('Comanda a fost facuta!');
            this.clearCommandPage();
            this.createHome();
            //insert to database, most probably through an azure function
        });
        this.backHome = document.createElement('button');
        this.backHome.textContent = 'Back Home';
        this.backHome.addEventListener('click', () => {
            this.clearCommandPage();
            this.createHome();
        });
        document.body.appendChild(this.backHome);
        // this.pressAfter = document.createElement('button');
        // this.pressAfter.textContent = 'click';
        // document.body.appendChild(this.pressAfter);
        // this.pressAfter.addEventListener('mousedown', () => {
        //     console.log(this.distance);
        // });
    }

    clearVolunteerPage() {
        document.body.removeChild(this.comLabel);
        for (let i = 0; i < this.divs.length; i++) {
            document.body.removeChild(this.divs[i]);
        }
        document.body.removeChild(this.backHome);
    }

    createVolunteerPage() {
        this.getLocation();
        document.getElementById('title').innerText = 'Volunteer and deliver';
        this.comLabel = document.createElement('h2');
        this.comLabel.innerText = 'Commands:';
        this.mails = [];
        this.divs = [];
        document.body.appendChild(this.comLabel);
        this.listOfComms = [];
        fetch('https://testezfunction.azurewebsites.net/api/selectCommand?code=MeU878GX9XxZrQpqpzJUSqHT9t2uHkebdsC/PDzl2E/y59e6MlSFCw==&userId=0', {
            method: 'GET'
        })
            .then(data => data.json())
            .then(resp => {
                for (let i = 0; i < resp.length; i++) {
                    fetch('https://testezfunction.azurewebsites.net/api/operationOnUser?code=DCI4tJsds3o6ipXcu/DSeYQzxBaWKZJp12gdLlWRLPpYIylG3aeaIg==', {
                        method: 'POST',
                        body: JSON.stringify({
                            type: 'select',
                            mail: resp[i].userId
                        })
                    }).then(dta => dta.json())
                        .then(ans => {
                            if (ans.length > 0) {
                                if (ans[0].geol) {
                                    let lt = parseFloat(ans[0].geol.split(',')[0]);
                                    let lng = parseFloat(ans[0].geol.split(',')[1]);
                                    getDistance({'x': lt, 'y': lng}, {'x': this.lat, 'y': this.long}, (val) => {
                                        if (val <= 2) {
                                            let cont = document.createElement('div');
                                            let comBx = document.createElement('textarea');
                                            let prefBx = document.createElement('textarea');
                                            comBx.cols = 15;
                                            comBx.rows = 10;
                                            prefBx.cols = 15;
                                            prefBx.rows = 10;
                                            comBx.value = resp[i].command;
                                            prefBx.value = resp[i].prefs;
                                            comBx.readOnly = true;
                                            prefBx.readOnly = true;
                                            comBx.style.resize = 'none';
                                            prefBx.style.resize = 'none';
                                            cont.appendChild(comBx);
                                            cont.appendChild(prefBx);
                                            let btn = document.createElement('button');
                                            btn.textContent = 'Take Command';
                                            btn.addEventListener('click', () => {
                                                // console.log(this.divs);
                                                fetch('https://testezfunction.azurewebsites.net/api/sendMail?code=PcfelJXGwrTX0don0VPrh0QHhUlYMet2UEKmdvIW/iSkQoXQhOHWVQ==', {
                                                    method: 'POST',
                                                    body: JSON.stringify({
                                                        recipient: resp[i].userId,
                                                        subject: 'Confirmation',
                                                        text: 'Your command will be shorten delivered to you by ' + this.mail + '!'
                                                    })
                                                }).then(data => {

                                                });
                                                // console.log(resp[i].userId);
                                                fetch('https://testezfunction.azurewebsites.net/api/operationOnUser?code=DCI4tJsds3o6ipXcu/DSeYQzxBaWKZJp12gdLlWRLPpYIylG3aeaIg==', {
                                                    method: 'POST',
                                                    body: JSON.stringify({
                                                        type: 'delete',
                                                        mail: resp[i].userId
                                                    })
                                                }).then(data => {
                                                    this.clearVolunteerPage();
                                                    this.createVolunteerPage();
                                                });
                                            });
                                            cont.appendChild(btn);
                                            document.body.appendChild(cont);
                                            this.divs.push(cont);
                                        }
                                        if (i === resp.length - 1) {
                                            this.backHome = document.createElement('button');
                                            this.backHome.textContent = 'Back Home';
                                            this.backHome.addEventListener('click', () => {
                                                this.clearVolunteerPage();
                                                this.createHome();
                                            });
                                            document.body.appendChild(this.backHome);
                                        }
                                    });
                                }
                            }
                        });
                }
            });
        //aici e o functie care returneaza doar comenzile acelor persoane 
        //care se afla intr-o distanta de 2-3 km de livrator

    }

    deleteCookie(cookieName) {
        document.cookie = cookieName + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    }

    checkForCookie() {
        if (document.cookie.length < 1) {
            return false;
        }
        let cookies = document.cookie.split(';');
        let bool = false;
        for (let i = 0; i < cookies.length; i++) {
            let key = cookies[i].split('=')[0];
            let value = cookies[i].split('=')[1];
            key = key.trim();
            value = value.trim();
            if (key === 'mail') {
                this.mail = value;
                bool = true;
            } else if (key === 'lat') {
                this.lat = parseFloat(value);
            } else if (key === 'long') {
                this.long = parseFloat(value);
            }
        }
        return bool;
    }

    createHome() {
        this.volBtn = document.createElement('button');
        this.cmnBtn = document.createElement('button');
        this.volBtn.textContent = 'Volunteer';
        this.cmnBtn.textContent = 'Command';
        document.body.appendChild(this.volBtn);
        document.body.appendChild(this.cmnBtn);
        this.volBtn.style.position = 'absolute';
        this.cmnBtn.style.position = 'absolute';
        this.volBtn.style.top = '35%';
        this.cmnBtn.style.top = '35%';
        this.volBtn.style.left = '25%';
        this.cmnBtn.style.left = '60%';
        this.volBtn.style.width = '15%';
        this.volBtn.style.height = '15%';
        this.cmnBtn.style.width = '15%';
        this.cmnBtn.style.height = '15%';
        this.volBtn.addEventListener('mousedown', () => {
            this.clearHome();
            this.createVolunteerPage();
        });
        this.cmnBtn.addEventListener('mousedown', () => {
            this.clearHome();
            this.createCommandPage();
        });
    }

    initPage() {
        if (this.checkForCookie() === true) {
            document.getElementById('title').innerText = 'Why are you here?';
            this.createHome();
        } else {
            document.getElementById('title').innerText = '';
            this.p = document.createElement('h2');
            this.p.innerText = 'Your Email:';
            this.tbx = document.createElement('input');
            this.tbx.type = 'text';
            document.body.appendChild(this.p);
            document.body.appendChild(this.tbx);
            this.submit = document.createElement('button');
            this.submit.textContent = 'Submit';
            this.submit.addEventListener('click', () => {
                this.mail = this.tbx.value;
                console.log(this.mail);
                document.body.removeChild(this.p);
                document.body.removeChild(this.tbx);
                document.body.removeChild(this.submit);
                document.getElementById('title').innerText = 'Why are you here?';
                document.cookie = ("mail=" + this.mail);
                this.createHome();
            });
            document.body.appendChild(this.submit);
        }
    }
}

let obj = new PageEditor();
obj.initPage();