import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[100,599],[0,20]]
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
        status = cell(data,i,0)
        if status >= 200 and status < 300:
            out.append(0)
        else:
            if (status == 408 or status == 429 or status >= 500) and cell(data,i,1) < 5:
                out.append(1)
            else:
                out.append(2)
    return out
