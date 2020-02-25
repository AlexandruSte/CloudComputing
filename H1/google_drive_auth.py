from __future__ import print_function

import os.path
import pickle
import time
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from utils import write


class Auth:

    def __init__(self, SCOPES, CLIENT_SECRET_FILE):
        self.SCOPES = SCOPES
        self.CLIENT_SECRET_FILE = CLIENT_SECRET_FILE

    def get_credentials(self):
        creds = None
        # The file token.pickle stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if os.path.exists('app/token.pickle'):
            with open('app/token.pickle', 'rb') as token:
                creds = pickle.load(token)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(self.CLIENT_SECRET_FILE, self.SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('app/token.pickle', 'wb') as token:
                pickle.dump(creds, token)
        return creds


# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
CLIENT_SECRET_FILE = 'client_secret.json'


def list_files():
    authInstance = Auth(SCOPES, CLIENT_SECRET_FILE)
    credentials = authInstance.get_credentials()

    service = build('drive', 'v3', credentials=credentials)
    start_time = time.time()
    results = service.files().list(fields="nextPageToken, files(id, name)").execute()
    time_taken = time.time() - start_time
    write('Google get files', 'dict of ' + str(len(results.get('files', []))) + ' elements', time_taken, 'Google')
    return results.get('files', [])
