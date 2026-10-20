import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[-10000,10000]]
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
    count = 0
    previous = 0
    for i in range(0, n):
        if count > 0 and cell(data,i,0) != previous:
            out.append(previous)
            out.append(count)
            count = 0
        previous = cell(data,i,0)
        count = count+1
    if count > 0:
        out.append(previous)
        out.append(count)
    return out
