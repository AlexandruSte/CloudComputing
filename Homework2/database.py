import json
from pymongo import MongoClient

filename = 'credentials.json'


class Database:
    with open(filename) as json_file:
        data = json.load(json_file)
        url = data['url']
        cluster = data['cluster']
        collection = data['collection']

    def instance(self):
        return MongoClient(self.url)[self.cluster][self.collection]
