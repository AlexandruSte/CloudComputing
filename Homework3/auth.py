from __future__ import print_function

import os.path
import pickle
import requests
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow


def google_auth_login():
    SCOPES = ['https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid']
    os.environ['OAUTHLIB_RELAX_TOKEN_SCOPE'] = '1'

    credentials = None
    filename = 'google-auth-credentials.json'

    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            credentials = pickle.load(token)

    try:
        if not credentials or not credentials.valid:
            if credentials and credentials.expired and credentials.refresh_token:
                credentials.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(filename, SCOPES)
                credentials = flow.run_local_server(port=0)

            with open('token.pickle', 'wb') as token:
                pickle.dump(credentials, token)

        url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + credentials.token
        data = requests.get(url).json()
        return True, (data['family_name'], data['given_name'], data['email'])
    except:
        return False, ()
