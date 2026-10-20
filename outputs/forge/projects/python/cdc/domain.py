import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,99],[1,10000],[0,1],[0,10000]]
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
    version = [0] * (100)
    present = [0] * (100)
    values = [0] * (100)
    for i in range(0, n):
        id = cell(data,i,0)
        if cell(data,i,1) > version[id]:
            version[id] = cell(data,i,1)
            present[id] = 1-cell(data,i,2)
            values[id] = cell(data,i,3)
    for id in range(0, 100):
        if present[id] == 1:
            out.append(id)
            out.append(values[id])
    return out
