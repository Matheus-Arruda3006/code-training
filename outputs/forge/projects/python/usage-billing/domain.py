import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000]]
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
    for i in range(0, n):
        units = cell(data,i,0)
        total = minv(units,100) * 10
        total = total + minv(maxv(units-100,0),100) * 8
        total = total + maxv(units-200,0) * 5
        out.append(total)
    return out
