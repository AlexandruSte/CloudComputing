import json
import requests
import smtplib
from flask import escape


def confirmDelivery(request):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/update?table=comenzi&vol='
    mailApi = 'https://us-central1-bsffinal.cloudfunctions.net/sendMail?status=deliver&receiver='
    req_args = request.args
    if req_args and 'vol' in req_args:
        urlApi += req_args['vol'] + '&status=active&status*=delivered'
        requests.get(urlApi)
        mailApi += req_args['clnt']
        requests.get(mailApi)
        return json.dumps({'Status': 'Delivered'})
    else:
        return json.dumps({'Status': 'Nothing to confirm'})


def createLocation(request):
    req_args = request.args
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/insertDatastore?table=locations&id='
    if req_args and 'id' in req_args:
        urlApi += req_args['id']
        urlApi += '&coords='
        urlApi += req_args['coords']
        requests.get(urlApi)
        return json.dumps({'Status': 'Done'})
    else:
        return json.dumps({'Status': 'No data'})


def getActive(request):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=comenzi&status=active'
    req_args = request.args
    if req_args and 'id' in req_args:
        r = requests.get(urlApi + '&vol=' + req_args['id'])
        vols = r.json()
        r = requests.get(urlApi + '&clnt=' + req_args['id'])
        clnts = r.json()
        if len(vols) > 0:
            return json.dumps(vols)
        else:
            return json.dumps(clnts)
    else:
        r = requests.get(urlApi)
        dt = r.json()
        return json.dumps(dt)


def getAddress(request):
    key = 'AIzaSyB8qllNDF7QlJKRXvFVQ7RkSm7GqtHCmmw'
    apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    request_args = request.args
    if request_args and 'coords' in request_args:
        # here we call the api
        apiUrl += request_args['coords']
        apiUrl += '&key='
        apiUrl += key
        r = requests.get(url=apiUrl)
        data = r.json()
        return data['results'][0]['formatted_address']
    else:
        return 'Not Found'


def getAllOrders(request):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=orders'
    req_args = request.args
    if req_args and 'city' in req_args:
        urlApi += '&city='
        r = requests.get(urlApi + req_args['city'])
        data = r.json()
        indexes = []
        for i in range(0, len(data)):
            if data[i]['clnt'] == req_args['vol']:
                indexes.append(i)
        for i in range(0, len(indexes)):
            data.pop(indexes[i] - i)
        return json.dumps(data)
    else:
        r = requests.get(urlApi)
        data = r.json()
        if req_args and 'clnt' in req_args:
            index = -1
            for i in range(len(data)):
                if data[i]['clnt'] == req_args['clnt']:
                    index = i
                    break
            if index != -1:
                data = [data[index]]
            else:
                data = []
        return json.dumps(data)


def getCity(request):
    key = 'AIzaSyB8qllNDF7QlJKRXvFVQ7RkSm7GqtHCmmw'
    apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    request_args = request.args
    if request_args and 'coords' in request_args:
        apiUrl += request_args['coords']
        apiUrl += '&key='
        apiUrl += key
        r = requests.get(url=apiUrl)
        data = r.json()
        return data['results'][0]['address_components'][1]['long_name']
    else:
        return 'Nothing_Found'


def getHistoryDelivered(request):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=comenzi&status=delivered'
    req_args = request.args
    if req_args and 'id' in req_args:
        data = (requests.get(urlApi + '&vol=' + req_args['id'])).json()
        return json.dumps(data)
    else:
        return json.dumps({'Status': 'No data'})


def getHistoryReceived(request):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=comenzi&status=delivered'
    req_args = request.args
    if req_args and 'id' in req_args:
        data = (requests.get(urlApi + '&clnt=' + req_args['id'])).json()
        return json.dumps(data)
    else:
        return json.dumps({'Status': 'No data'})


def getLocation(request):
    req_args = request.args
    selApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=locations'
    if req_args and 'id' in req_args:
        selApi += '&id='
        selApi += req_args['id']
        r = requests.get(selApi)
        data = r.json()
        return json.dumps(data)
    else:
        return json.dumps([])


def listSupermarkets(request):
    key = 'AIzaSyB8qllNDF7QlJKRXvFVQ7RkSm7GqtHCmmw'
    apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
    dat = '&radius=1000&type=supermarket'
    # request_args = request.args
    result_arr = []
    # if request_args and 'coords' in request_args:
    request_args = request.args
    if request_args and 'coords' in request_args:
        # here we call the api
        apiUrl += request_args['coords']
        apiUrl += '&key='
        apiUrl += key
        apiUrl += dat
        r = requests.get(url=apiUrl)
        data = r.json()
        for el in data['results']:
            obj = {}
            obj['vicinity'] = el['vicinity']
            obj['name'] = el['name']
            result_arr.append(obj)
        return json.dumps(result_arr)
    else:
        return json.dumps({'status': 'Nothing found'})


def placeOrder(request):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/insertDatastore?table=orders&clnt='
    mailApi = 'https://us-central1-bsffinal.cloudfunctions.net/sendMail?'
    req_args = request.args
    if req_args and 'clnt' in req_args:
        urlApi += req_args['clnt']
        urlApi += ('&msg=' + req_args['msg'])
        urlApi += '&addr='
        urlApi += req_args['addr']
        urlApi += '&city='
        urlApi += req_args['city']
        requests.get(url=urlApi)
        mailApi += 'status=confirmation&receiver='
        mailApi += req_args['clnt']
        requests.get(mailApi)
        return json.dumps({'Status': 'Order placed'})
    else:
        return json.dumps({'Status': 'No data!'})


def sendMail(request):
    # creates SMTP session 
    s = smtplib.SMTP('smtp.gmail.com', 587)
    # start TLS for security 
    s.starttls()
    req_args = request.args
    if req_args and 'receiver' in req_args:
        s.login("bsffinal@gmail.com", "ceitreipatati1221")
        arr = [
            "From: bsffinal@gmail.com",
            "To: " + req_args['receiver'],
            "Subject: ",
            ""
        ]
        if req_args['status'] == 'deliver':
            arr[2] += "Your Orders Are Here"
            arr.append("Stuffs you ordered will be there in few moments!")
        elif req_args['status'] == 'confirmation':
            arr[2] += "Order Confirmation"
            arr.append("Your order is placed, you can see it on the page!")
        elif req_args['status'] == 'took':
            arr[2] += "Order took"
            arr.append("You just tooked an order!Keep up good work!")
        else:
            arr[2] += "Order on the way"
            arr.append("Your order has been took by one of our volunteers.")
        message = "\r\n".join(arr)
        s.sendmail("bsffinal@gmail.com", req_args['receiver'], message)
        s.quit()
        return 'Message sent'
    else:
        return 'Invalid Data'


def tookOrder(request):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=orders&clnt='
    deleteApi = 'https://us-central1-bsffinal.cloudfunctions.net/delete?table=orders&clnt='
    insertApi = 'https://us-central1-bsffinal.cloudfunctions.net/insertDatastore?table=comenzi&vol='
    mailApi = 'https://us-central1-bsffinal.cloudfunctions.net/sendMail?status=took&receiver='
    mailApi2 = 'https://us-central1-bsffinal.cloudfunctions.net/sendMail?status=ontheway&receiver='
    req_args = request.args
    if req_args and 'clnt' in req_args:
        urlApi += req_args['clnt']
        deleteApi += req_args['clnt']
        insertApi += req_args['vol']
        r = requests.get(url=urlApi)
        dt = r.json()
        requests.get(deleteApi)
        if len(dt) > 0:
            keys = dt[0].keys()
            for i in keys:
                insertApi += ('&' + i + '=' + dt[0][i])
            insertApi += '&status=active'
            requests.get(insertApi)
            mailApi += req_args['vol']
            requests.get(mailApi)
            mailApi2 += req_args['clnt']
            requests.get(mailApi2)
            return json.dumps({'Status': 'Order tooked'})
        else:
            return json.dumps({'Status': 'No data!'})
    else:
        return json.dumps({'Status': 'No data!'})


def updateLocation(request):
    req_args = request.args
    updApi = 'https://us-central1-bsffinal.cloudfunctions.net/update?table=locations&id='
    selApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=locations&id='
    insApi = 'https://us-central1-bsffinal.cloudfunctions.net/insertDatastore?table=locations&id='
    if req_args and 'id' in req_args:
        r = requests.get(selApi + req_args['id'])
        dt = r.json()
        if len(dt) > 0:
            updApi += req_args['id']
            updApi += '&coords*=' + req_args['coords']
            requests.get(updApi)
        else:
            insApi += req_args['id']
            insApi += '&coords=' + req_args['coords']
            requests.get(insApi)
        return json.dumps({'Status': 'Done'})
    else:
        return json.dumps({'Status': 'No data'})
