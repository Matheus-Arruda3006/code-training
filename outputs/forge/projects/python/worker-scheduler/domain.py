import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000],[1,10000]]
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
    available = [0] * (3)
    for i in range(0, n):
        best = 0
        for worker in range(1, 3):
            if available[worker] < available[best]:
                best = worker
        available[best] = maxv(available[best],cell(data,i,0))+cell(data,i,1)
        out.append(best)
        out.append(available[best])
    return out
