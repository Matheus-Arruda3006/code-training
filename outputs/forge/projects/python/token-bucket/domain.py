import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = [[0,10000],[1,10]]
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
    tokens = 10
    previous = 0
    for i in range(0, n):
        now = cell(data,i,0)
        if now < previous:
            raise ValueError("Regra de negócio inválida")
        tokens = minv(10,tokens+(now-previous)*2)
        previous = now
        if cell(data,i,1) <= tokens:
            tokens = tokens-cell(data,i,1)
            out.append(1)
        else:
            out.append(0)
    return out
