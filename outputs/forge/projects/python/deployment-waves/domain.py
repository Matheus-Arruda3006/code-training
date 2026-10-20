import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[1,100]]
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
    wave = 0
    used = 0
    for i in range(0, n):
        if used+cell(data,i,0) > 100:
            wave = wave+1
            used = 0
        used = used+cell(data,i,0)
        out.append(wave)
    if n == 0:
        out.append(0)
    else:
        out.append(wave+1)
    return out
