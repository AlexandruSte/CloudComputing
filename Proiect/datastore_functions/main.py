import datetime
import google.cloud.exceptions
import hashlib
import json
import os
import requests
from google.cloud import datastore

credential_path = "bsffinal-45530f1e759f.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
client = datastore.Client('bsffinal')


def insertIntoTable(arguments):
    data = {}
    for i in arguments:
        if i != 'table':
            data[i] = arguments[i]

    with client.transaction():
        key = client.key(arguments['table'])
        task = datastore.Entity(key=key)
        task.update(data)
        client.put(task)
    return task


def selectFromTable(arguments):
    with client.transaction():
        query = client.query(kind=arguments['table'])
        for i in arguments:
            if i != 'table':
                query.add_filter(i, '=', arguments[i])
        l = []
        keys = []
        if len(list(query.fetch())):
            for x in list(query.fetch())[0]:
                keys.append(x)
            for queryItem in query.fetch():
                obj = {}
                for i in keys:
                    if i != 'table':
                        obj[i] = queryItem.get(i)
                l.append(obj)
    return json.dumps(l)


def updateIntoTable(arguments):
    with client.transaction():
        query = client.query(kind=arguments['table'])
        keys = []
        for i in arguments:
            if i != 'table':
                if i[-1] != '*':
                    query.add_filter(i, '=', arguments[i])
                else:
                    keys.append(i[0:-1])

        l = []
        for queryItem in query.fetch():
            for arg in keys:
                queryItem[arg] = arguments[arg + '*']
            client.put(queryItem)


def deleteFromTable(arguments):
    with client.transaction():
        query = client.query(kind=arguments['table'])
        for i in arguments:
            if i != 'table':
                query.add_filter(i, '=', arguments[i])
        l = []
        for queryItem in query.fetch():
            client.delete(queryItem.key)


def insert(request):
    request_args = request.args
    if request_args and 'table' in request_args and len(request_args) > 1:
        insertIntoTable(request_args)
        return 'Insert Succesfully'
    else:
        return 'Nothing_Found'


def select(request):
    request_args = request.args
    if request_args and 'table' in request_args:
        return selectFromTable(request_args)
    else:
        return 'Nothing_Found'


def update(request):
    request_args = request.args
    if request_args and 'table' in request_args and len(request_args) > 1:
        updateIntoTable(request_args)
        return 'Update Succesfully'
    else:
        return 'Nothing_Found'


def delete(request):
    request_args = request.args
    if request_args and 'table' in request_args:
        deleteFromTable(request_args)
        return 'Delete Succesfully'
    else:
        return 'Nothing_Found'
