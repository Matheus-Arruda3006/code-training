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
    small = 0
    medium = 0
    large = 0
    for i in range(0, n):
        if cell(data,i,0) <= 10:
            small = small+1
        if cell(data,i,0) <= 50:
            medium = medium+1
        if cell(data,i,0) <= 100:
            large = large+1
    out.append(small)
    out.append(medium)
    out.append(large)
    out.append(n)
    return out
