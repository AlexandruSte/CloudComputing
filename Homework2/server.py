from bson.json_util import dumps
from database import Database
from http.server import BaseHTTPRequestHandler


# noinspection PyBroadException
class Server(BaseHTTPRequestHandler):

    def do_GET(self):
        print('get')
        if self.path == '/food':
            try:
                collection = Database().instance().find()
                return self.respond(200, dumps(collection))
            except:
                return self.respond(500, 'Interval server error.')
        if self.path[0:6] == '/food/':
            items = self.path.split('/')
            if len(items) > 2:
                item = items[2]
                try:
                    collection = Database().instance().find({'nume': item})
                    result = dumps(collection)
                    if result != '[]':
                        return self.respond(200, result)
                    else:
                        return self.respond(404, 'Element not found.')
                except:
                    return self.respond(500, 'Interval server error.')
        else:
            return self.respond(400, 'You haven\'t provided an identifier to find the food.')
        return self.respond(400, 'Path not found.')

    def do_POST(self):
        print('post')
        if self.path[0:6] == '/food?' or self.path[0:7] == '/food/?':
            ids = self.path.split('?')[1]
            ids = ids.split('&')
            if len(ids) != 0:
                has_name = False
                name = ''
                obj = {}
                for id in ids:
                    deconstruct = id.split('=')
                    obj[deconstruct[0]] = deconstruct[1]
                    if deconstruct[0] == 'nume':
                        name = deconstruct[1]
                        has_name = True
                if not has_name:
                    return self.respond(409, 'You have to provide the "nume" field.')
                try:
                    if Database().instance().find({'nume': name}).count() == 0:
                        Database().instance().insert_one(obj)
                        return self.respond(201, 'Food created with success.')
                    else:
                        return self.respond(409, 'Item already exists.')
                except:
                    return self.respond(500, 'Interval server error.')
            else:
                return self.respond(409, 'You have to provide at least the "nume" field.')
        if self.path[0:6] == '/food/':
            return self.respond(405, 'Cannot POST on an ID.')
        return self.respond(400, 'Path not found.')

    def do_DELETE(self):
        print('delete')
        if self.path == '/food' or self.path == '/food/':
            try:
                Database().instance().delete_many({})
                return self.respond(200, 'All documents have been deleted.')
            except:
                return self.respond(500, 'Interval server error.')
        if self.path[0:6] == '/food/':
            items = self.path.split('/')
            if len(items) > 2:
                item = items[2]
                try:
                    if Database().instance().find({'nume': item}).count() > 0:
                        Database().instance().delete_one({'nume': name})
                        return self.respond(200, 'Food deleted with success.')
                    else:
                        return self.respond(404, 'Food not found.')
                except:
                    return self.respond(500, 'Interval server error.')
            else:
                return self.respond(400, 'You haven\'t provided an identifier to find the food.')
        return self.respond(400, 'Path not found.')

    def do_PUT(self):
        print('put')
        if self.path[0:6] == '/food/':
            ids = self.path.split('/')
            if len(ids) > 2:
                ids = ids[2].split('?')
                if len(ids) > 1:
                    nume = ids[0]
                    ids = ids[1].split('&')
                    query, document = {}, {}
                    for id in ids:
                        id_split = id.split('=')
                        document[id_split[0]] = id_split[1]
                    query['nume'] = nume
                    document['nume'] = nume
                    try:
                        if Database().instance().find(query).count() > 0:
                            Database().instance().delete_one(query)
                            Database().instance().insert_one(document)
                            return self.respond(200, 'Food modified with success.')
                        else:
                            return self.respond(404, 'Food not found.')
                    except:
                        return self.respond(500, 'Interval server error.')
        elif self.path[0:6] == '/food?' or self.path[0:7] == '/food/?':
            return self.respond(405, 'Cannot PUT on a collection.')
        return self.respond(400, 'Path not found.')

    def do_PATCH(self):
        print('patch')
        if self.path[0:6] == '/food/':
            ids = self.path.split('/')
            if len(ids) > 2:
                ids = ids[2].split('?')
                if len(ids) > 1:
                    nume = ids[0]
                    ids = ids[1].split('&')
                    query, document = {}, {}
                    for id in ids:
                        id_split = id.split('=')
                        document[id_split[0]] = id_split[1]
                    query['nume'] = nume
                    try:
                        if Database().instance().find({'nume': query['nume']}).count() > 0:
                            Database().instance().update_one(query, {'$set': document})
                            return self.respond(200, 'Food modified with success.')
                        else:
                            return self.respond(404, 'Food not found.')
                    except:
                        return self.respond(500, 'Interval server error.')
        elif self.path[0:6] == '/food?' or self.path[0:7] == '/food/?':
            return self.respond(405, 'Cannot PATCH on a collection.')
        return self.respond(400, 'Path not found.')

    def respond(self, status_code, content):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(bytes(content, 'UTF - 8'))
