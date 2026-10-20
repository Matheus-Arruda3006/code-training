import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000],[0,10000]]
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
    peak = 0
    first = -1
    for i in range(0, n):
        if cell(data,i,0) >= cell(data,i,1):
            raise ValueError("Regra de negócio inválida")
    for i in range(0, n):
        time = cell(data,i,0)
        count = 0
        for j in range(0, n):
            if cell(data,j,0) <= time and cell(data,j,1) > time:
                count = count+1
        if count > peak or (count == peak and (first == -1 or time < first)):
            peak = count
            first = time
    out.append(peak)
    out.append(first)
    return out
