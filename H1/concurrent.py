import requests
from multiprocessing import Pool


def send_request(index):
    print('Process ' + str(index) + ' started.')
    url = 'http://127.0.0.1:5000/apis'
    requests.get(url, {})
    print('Process ' + str(index) + ' ended.')


if __name__ == '__main__':
    print('Start execution.')
    with Pool(50) as pool:
        pool.map(send_request, [i for i in range(500)])
    print('Ended.')
