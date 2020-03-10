import re

from app import app
from dropbox_auth import get_files
from google_drive_auth import list_files
from random_api import call_random
from utils import write_metrics


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/apis', methods=['GET'])
def apis():
    google_drive_response = len(list_files())
    dropbox_response = len(get_files())
    if google_drive_response < dropbox_response:
        min_files, max_files = google_drive_response, dropbox_response
    else:
        min_files, max_files = dropbox_response, google_drive_response
    random_number = call_random(min_files, max_files)
    return random_number


@app.route('/metrics')
def metrics():
    times = re.findall('[.0-9]{8,15}', open('logs.txt', 'r').read())
    google_time = [float(times[i]) for i in range(0, len(times), 3)]
    dropbox_time = [float(times[i]) for i in range(1, len(times), 3)]
    random_time = [float(times[i]) for i in range(2, len(times), 3)]
    return write_metrics(google_time, dropbox_time, random_time)
