import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000],[0,1]]
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
    failures = 0
    until = 0
    for i in range(0, n):
        now = cell(data,i,0)
        if i > 0:
            if now < cell(data,i-1,0):
                raise ValueError("Regra de negócio inválida")
        if now < until:
            out.append(0)
        else:
            out.append(1)
            if cell(data,i,1) == 1:
                failures = 0
            else:
                failures = failures+1
            if failures >= 3:
                until = now+5
    return out
