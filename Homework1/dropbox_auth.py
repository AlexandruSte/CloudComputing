import json
import time

from dropbox import Dropbox

from utils import write

filename = 'dropbox_token.json'


def get_files():
    token = json.load(open(filename))['token']
    dbx = Dropbox(token)
    start_time = time.time()
    results = dbx.files_list_folder('', include_deleted=True)
    time_taken = time.time() - start_time
    write('Dropbox get files', 'dict of ' + str(len(results.entries)) + ' elements', time_taken, 'Dropbox')
    return results.entries
