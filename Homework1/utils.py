import re

filename = 'logs.txt'


def write(request, response, time, id):
    file = open(filename, 'a')
    file.write('Request at ' + request)
    file.write('.\nResponse given: ' + response)
    file.write('.\n' + id + ' time: ' + str(time) + '.\n\n')
    file.close()


def write_metrics(google, dropbox, random):
    s = ''
    s += '<br><br>Google total requests: ' + str(len(google))
    s += '<br>Google average time: ' + str(sum(google) / len(google))

    s += '<br><br>Dropbox total requests: ' + str(len(dropbox))
    s += '<br>Dropbox average time: ' + str(sum(dropbox) / len(dropbox))

    s += '<br><br>Random.org total requests: ' + str(len(random))
    s += '<br>Random.org average time: ' + str(sum(random) / len(random))

    total_requests = len(google) + len(dropbox) + len(random)
    s += '<br><br>Total requests ' + str(total_requests)
    s += '<br>Total average time ' + str((sum(google) + sum(dropbox) + sum(random)) / total_requests)

    values = re.findall('<pre class="data">[0-9]+', open('logs.txt', 'r').read())
    values = [value.split('>')[1] for value in values]
    values = [int(value) for value in values]
    maxx, countt = 0, 0
    for value in values:
        current = values.count(value)
        if current > countt:
            countt = current
            maxx = value

    s += '<br> The most received value from random.org is ' + str(maxx) + ' being received ' + str(countt) + ' times.'

    return s
