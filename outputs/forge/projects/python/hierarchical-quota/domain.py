import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99],[1,100]]
    if not isinstance(data, list) or len(data) > 200:
        raise ValueError('Até 200 registros')
    for row in data:
        if not isinstance(row, list) or len(row) != len(bounds):
            raise ValueError('Colunas inválidas')
        for value, (low, high) in zip(row, bounds):
            if type(value) is not int or not low <= value <= high:
                raise ValueError('Valor fora do contrato')
    n = len(data)
    out = []
    used = [0] * (100)
    total = 0
    for i in range(0, n):
        user = cell(data,i,0)
        cost = cell(data,i,1)
        if used[user]+cost <= 50 and total+cost <= 120:
            used[user] = used[user]+cost
            total = total+cost
            out.append(1)
        else:
            out.append(0)
    out.append(total)
    return out
