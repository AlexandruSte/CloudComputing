import re
import requests
import time
from utils import write


def call_random(min_value, max_value):
    url = 'https://www.random.org/integers/?min=' + str(min_value) + '&max=' + str(
        max_value) + '&col=1&format=html&base=10&num=1'
    start_time = time.time()
    response = requests.get(url, {}).text
    time_taken = time.time() - start_time
    write('random.org to generate a integer ', response, time_taken, 'Random')
    return re.findall('<pre class="data">[0-9]+', response)[0].split('>')[1]
