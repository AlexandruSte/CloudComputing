import json
import requests
from flask import escape


def geo_listShops(request):
    key = 'AIzaSyCoC4iCnq_cAUgOhVWy553iuAZk66SWZ3U'
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
