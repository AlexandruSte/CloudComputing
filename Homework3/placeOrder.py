import flask
from datastore import insert
from flask import render_template
from flask import request
from flask import send_from_directory


def serveOrder(req):
    print(req.cookies.get('email'))
    return render_template('order.html')


def processOrder(req):
    # print(req.data.decode())
    insert(req.cookies.get('email'), req.data.decode())
    return flask.jsonify({'status': 'Ok'})
