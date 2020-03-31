function Order() {

    let orderContent;
    let textArea;
    let submitButton;
    let simpleP;
    let location = 'Geolocation is not supported by this browser!';
    let apiUrl = 'https://us-central1-buy-some-food.cloudfunctions.net/geo_listShops?coords=';
    let apiUrlCity = 'https://us-central1-buy-some-food.cloudfunctions.net/geo_location?coords=';
    let submitOrder;

    function getLocationData() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                location = '' + position.coords.latitude + ',' + position.coords.longitude;
                fetch(apiUrl + location)
                    .then((resp) => {
                        return resp.json();
                    }).then((data) => {
                    createMarketList(data);
                });
            });
        }
    }

    function submitButtonEvent() {
        orderContent = textArea.value;
        document.body.removeChild(textArea);
        document.body.removeChild(submitButton);
        console.log(orderContent);
        getLocationData();
        simpleP.textContent = 'Now select supermarkets that you preffer';
    }

    function createForm() {
        simpleP = document.createElement('h2');
        textArea = document.createElement('textarea');
        textArea.rows = 20;
        textArea.cols = 50;
        textArea.style.resize = 'none';
        simpleP.textContent = 'Complete below your order!';
        document.body.appendChild(simpleP);
        document.body.appendChild(textArea);
        submitButton = document.createElement('button');
        submitButton.textContent = 'Order Now';
        submitButton.style.display = 'block';
        document.body.appendChild(submitButton);
        submitButton.addEventListener('mousedown', submitButtonEvent);
    }

    function createMarketList(data) {
        let checkBxs = [];
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            let tChkBx = document.createElement('input');
            tChkBx.setAttribute('type', 'checkbox');
            checkBxs.push(tChkBx);
            checkBxs[i].style.display = 'inline';
            document.body.appendChild(checkBxs[i]);
            let tempPar = document.createElement('p');
            tempPar.style.display = 'inline';
            tempPar.textContent = data[i].name + ',adresa: ' + data[i].vicinity;
            document.body.appendChild(tempPar);
            document.body.appendChild(document.createElement('br'));
        }
        submitOrder = document.createElement('button');
        submitOrder.textContent = 'Submit Order Now';
        document.body.appendChild(submitOrder);
        submitOrder.addEventListener('mousedown', () => {
            let commandObj = {};
            commandObj.command = orderContent;
            commandObj.shops = [];
            for (let i = 0; i < data.length; i++) {
                if (checkBxs[i].checked == true) {
                    commandObj.shops.push(data[i]);
                }
            }
            fetch(apiUrlCity + location)
                .then((resp) => {
                    return resp.json();
                })
                .then((data) => {
                    commandObj.location = data.city;
                    fetch('submitOrder', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(commandObj)
                    }).then((resp) => {
                        window.location.href = '/';
                        // alert('Your order had been placed!');
                    });
                });
            // let req = new XMLHttpRequest();
        });
    }

    return {
        createForm: createForm
    };
}