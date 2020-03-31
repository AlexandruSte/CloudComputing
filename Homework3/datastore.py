import datetime
import google.cloud.exceptions
import hashlib
import json
import os
from google.cloud import datastore

credential_path = "Buy-Some-Food-dbdeb9679797.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
client = datastore.Client('buy-some-food')


def insertClient(last_name, first_name, email, phone_number):
    with client.transaction():
        key = client.key('Clienti')
        task = datastore.Entity(key=key)

        task.update({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'phone_number': phone_number
        })
        client.put(task)
    return task


def insert(email, comanda):
    comanda = json.loads(comanda)
    magazine = ""
    for i in comanda["shops"]:
        magazine += i["name"] + " ( " + i["vicinity"] + " ) \n"
    with client.transaction():
        key = client.key('Comenzi')

        task = datastore.Entity(key=key)

        task.update({
            'email': email,
            'comanda': comanda["command"],
            'magazine': magazine,
            'status': 0
        })

        client.put(task)

    return task


def update_comenzi(data):
    data = json.loads(data)
    email = data['email']
    comanda = data['comanda']
    status = data['status']
    with client.transaction():
        query = client.query(kind='Comenzi')
        query.add_filter('email', '=', email)
        query.add_filter('comanda', '=', comanda)
        query.add_filter('status', '=', status)
        entity = list(query.fetch())[0]
        entity['status'] = 1
        client.put(entity)
        return entity


def get_comenzi():
    with client.transaction():
        query = client.query(kind='Comenzi')
        l = []
        for i in query.fetch():
            email = i.get('email')
            comanda = i.get('comanda')
            magazine = i.get('magazine')
            status = i.get('status')
            if status < 2:
                l.append({"email": email,
                          "comanda": comanda,
                          "magazine": magazine,
                          "status": status
                          })
    return json.dumps(l)


if __name__ == "__main__":
    # print(insertClient("gen", "asa", "email@th.rm", "0771643245935"))
    print(insert("asd@123.com", "1x Aer,2xPamant", "Lidl,Carefour"))
    # print(get_comenzi())
    # print(update())
