import requests
from flask import escape


def geo_location(request):
    key = 'AIzaSyCoC4iCnq_cAUgOhVWy553iuAZk66SWZ3U'
    apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    request_args = request.args
    if request_args and 'coords' in request_args:
        # here we call the api
        apiUrl += request_args['coords']
        apiUrl += '&key='
        apiUrl += key
        r = requests.get(url=apiUrl)
        data = r.json()
        return data['results'][0]['address_components'][2]['long_name']
    else:
        return 'Not Found'
