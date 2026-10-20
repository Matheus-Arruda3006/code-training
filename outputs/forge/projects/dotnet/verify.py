import json
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor

def reserve(quantity):
    body = json.dumps({"sku": "book", "quantity": quantity}).encode()
    request = urllib.request.Request("http://localhost:5080/reserve", data=body, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(request) as response:
            return response.status
    except urllib.error.HTTPError as error:
        return error.code

assert reserve(0) == 400
with ThreadPoolExecutor(max_workers=20) as pool:
    statuses = list(pool.map(reserve, [1] * 20))
assert statuses.count(200) == 10, statuses
assert statuses.count(409) == 10, statuses
print("Concorrência: 10 reservas e 10 conflitos.")
