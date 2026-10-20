import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[1,50],[0,10000]]
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
    best = [0] * (51)
    for i in range(0, n):
        capacity = 50
        while capacity >= cell(data,i,0):
            best[capacity] = maxv(best[capacity],best[capacity-cell(data,i,0)]+cell(data,i,1))
            capacity = capacity-1
    out.append(best[50])
    return out
